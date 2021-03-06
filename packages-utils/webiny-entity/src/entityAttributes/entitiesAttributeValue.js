// @flow
import { AttributeValue } from "webiny-model";
import Entity from "./../entity";
import EntityCollection from "./../entityCollection";

import { IAttribute } from "webiny-model/flow-typed";

class EntitiesAttributeValue extends AttributeValue {
    initial: EntityCollection;

    constructor(attribute: IAttribute) {
        super(attribute);

        this.current = new EntityCollection();
        this.initial = new EntityCollection();

        this.links = {
            dirty: false,
            set: false,
            current: new EntityCollection(),
            initial: new EntityCollection()
        };

        this.status = {
            loading: false,
            loaded: false
        };

        this.queue = [];
    }

    /**
     * Ensures data is loaded correctly, and in the end returns current value.
     * @returns {Promise<*>}
     */
    async load(callback: ?Function) {
        if (this.isLoaded()) {
            typeof callback === "function" && (await callback());
            return this.current;
        }

        if (this.isLoading()) {
            return new Promise(resolve => {
                this.queue.push(async () => {
                    typeof callback === "function" && (await callback());
                    resolve(this.current);
                });
            });
        }

        const classes = this.attribute.classes;

        this.status.loading = true;

        if (
            this.attribute
                .getParentModel()
                .getParentEntity()
                .isExisting()
        ) {
            if (this.attribute.getToStorage()) {
                if (this.hasCurrent()) {
                    if (classes.using.class) {
                        // TODO: finish this.
                        this.current = await classes.using.class.findByIds(this.current);
                    } else {
                        this.current = await classes.entities.class.findByIds(this.current);
                    }
                }
            } else if (
                this.attribute
                    .getParentModel()
                    .getParentEntity()
                    .isExisting()
            ) {
                let id = classes.entities.id;
                if (typeof id === "function") {
                    id = id();
                } else {
                    id = await this.attribute
                        .getParentModel()
                        .getAttribute("id")
                        .getStorageValue();
                }

                if (classes.using.class) {
                    this.links.current = await classes.using.class.find({
                        query: { [classes.entities.attribute]: id }
                    });

                    this.current = new EntityCollection();
                    for (let i = 0; i < this.links.current.length; i++) {
                        this.current.push(await this.links.current[i][classes.using.attribute]);
                    }
                } else {
                    this.current = await classes.entities.class.find({
                        query: { [classes.entities.attribute]: id }
                    });
                }
            }
        }

        // Set current entities as new values.
        this.syncInitial();

        typeof callback === "function" && (await callback());

        this.status.loading = false;
        this.status.loaded = true;

        if (this.queue.length) {
            for (let i = 0; i < this.queue.length; i++) {
                await this.queue[i]();
            }
            this.queue = [];
        }

        return this.current;
    }

    isLoaded(): boolean {
        return this.status.loaded;
    }

    isLoading(): boolean {
        return this.status.loading;
    }

    setInitial(value: EntityCollection): this {
        this.initial = value;
        return this;
    }

    getInitial(): EntityCollection {
        return this.initial;
    }

    hasInitial(): boolean {
        return this.getInitial().length > 0;
    }

    hasCurrent(): boolean {
        return this.getCurrent().length > 0;
    }

    async deleteInitial(): Promise<void> {
        // If initial is empty, that means nothing was ever loaded (attribute was not accessed) and there is nothing to do.
        // Otherwise, deleteInitial method will internally delete only entities that are not needed anymore.
        if (!this.hasInitial()) {
            return;
        }

        const initial = this.getInitial(),
            currentEntitiesIds = this.getCurrent().map(entity => entity.id);

        for (let i = 0; i < initial.length; i++) {
            const currentInitial = initial[i];
            if (!currentEntitiesIds.includes(currentInitial.id)) {
                await currentInitial.delete();
            }
        }
    }

    /**
     * Creates a new array that contains all currently loaded entities.
     */
    syncInitial(): void {
        this.initial = this.getCurrent().map(entity => entity);

        if (this.attribute.getUsingClass()) {
            this.links.initial = this.getCurrentLinks().map(entity => entity);
        }
    }

    getInitialLinks(): EntityCollection {
        return this.links.initial;
    }

    hasInitialLinks(): boolean {
        return this.getInitialLinks().length > 0;
    }

    getCurrentLinks(): EntityCollection {
        return this.links.current;
    }

    hasCurrentLinks(): boolean {
        return this.getCurrentLinks().length > 0;
    }

    setCurrentLinks(value: mixed, options: Object = {}): this {
        this.links.set = true;

        if (!options.skipDifferenceCheck) {
            if (this.isDifferentFrom(value)) {
                this.links.dirty = true;
            }
        }

        this.links.current = value;
        return this;
    }

    async deleteInitialLinks(): Promise<void> {
        // If initial is empty, that means nothing was ever loaded (attribute was not accessed) and there is nothing to do.
        // Otherwise, deleteInitial method will internally delete only entities that are not needed anymore.
        if (!this.hasInitialLinks()) {
            return;
        }

        const initialLinks = this.getInitialLinks(),
            currentLinksIds = this.getCurrentLinks().map(entity => entity.id);

        for (let i = 0; i < initialLinks.length; i++) {
            const initial = initialLinks[i];
            if (!currentLinksIds.includes(initial.id)) {
                await initial.delete();
            }
        }
    }

    async syncInitialLinks(): Promise<void> {
        const links = [],
            current = this.getCurrent(),
            currentLinks = this.getCurrentLinks();

        for (let i = 0; i < current.length; i++) {
            const currentEntity = current[i];

            // Following chunk actually represents: "_.find(currentLinks, link => link.group === current);".
            // "for" loop used because of async operations.
            let link = null;
            for (let j = 0; j < currentLinks.length; j++) {
                const linkedEntity = await currentLinks[j][this.attribute.getUsingAttribute()];
                if (linkedEntity === currentEntity) {
                    link = currentLinks[j];
                    break;
                }
            }

            // If entity has an already existing link instance, it will be used. Otherwise a new instance will be created.
            // Links array cannot contain two same instances.
            if (link && !links.includes(link)) {
                links.push(link);
            } else {
                const entity = new (this.attribute.getUsingClass())();
                await entity.set(this.attribute.getUsingAttribute(), currentEntity);
                await entity.set(
                    this.attribute.getEntitiesAttribute(),
                    this.attribute.getParentModel().getParentEntity()
                );
                links.push(entity);
            }
        }

        this.setCurrentLinks(links);
    }

    /**
     * Value cannot be set as clean if ID is missing in one of the entities.
     * @returns {this}
     */
    clean(): this {
        const current = this.getCurrent();
        for (let i = 0; i < current.length; i++) {
            if (current[i] instanceof Entity) {
                if (!current[i].id) {
                    return this;
                }
            }
        }

        return super.clean();
    }
}

export default EntitiesAttributeValue;

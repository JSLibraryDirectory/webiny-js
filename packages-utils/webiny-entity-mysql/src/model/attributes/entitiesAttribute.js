import { EntitiesAttribute as BaseEntitiesAttribute } from "webiny-entity";

class EntitiesAttribute extends BaseEntitiesAttribute {
    async getStorageValue() {
        return JSON.stringify(await BaseEntitiesAttribute.prototype.getStorageValue.call(this));
    }

    setStorageValue(value) {
        super.setStorageValue(JSON.parse(value));
        return this;
    }
}

export default EntitiesAttribute;

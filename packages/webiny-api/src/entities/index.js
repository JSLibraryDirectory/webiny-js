// @flow
import type { Entity } from "./Entity/Entity";

export { Group, Groups2Entities, Entity, Policy, Policies2Entities } from "./Entity";
export { default as File } from "./File/File.entity";
export { default as Image } from "./Image/Image.entity";
export { default as Settings } from "./Settings/Settings.entity";
export { default as Identity } from "./Identity/Identity.entity";
export { default as User } from "./User/User.entity";
export { default as ApiToken } from "./ApiToken/ApiToken.entity";

const entityClasses = [];

export const registerEntity = (entityClass: Class<Entity>) => {
    entityClasses.push(entityClass);
};

export const getEntityClasses = (): Array<Class<Entity>> => {
    return entityClasses;
};

export const getEntityClass = (classId: string): Class<Entity> | null => {
    for (let i = 0; i < getEntityClasses().length; i++) {
        let entityClass = getEntityClasses()[i];
        if (entityClass.classId === classId) {
            return entityClass;
        }
    }
    return null;
};

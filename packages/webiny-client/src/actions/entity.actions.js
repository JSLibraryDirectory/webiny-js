// @flow
import { createAction } from "./../redux";
import { graphqlQuery, graphqlMutation } from ".";
import {
    generateListQuery,
    generateFindOneQuery,
    generateUpdateQuery,
    generateCreateQuery
} from "./entity";

const PREFIX = "[ENTITY]";

export const ENTITY_LIST = `${PREFIX} List`;
export const ENTITY_FIND = `${PREFIX} Find`;
export const ENTITY_SAVE = `${PREFIX} Save`;
export const ENTITY_CREATE = `${PREFIX} Create`;
export const ENTITY_UPDATE = `${PREFIX} Update`;

const listEntities = createAction(ENTITY_LIST, {
    middleware({ action, next }) {
        next(action);

        const { entity, fields, variables, onSuccess, onError } = action.payload;
        const generatedQuery = generateListQuery({ entity, fields });
        graphqlQuery({
            ...generatedQuery,
            variables,
            onSuccess: data => {
                if (typeof onSuccess === "function") {
                    onSuccess({ ...data.data });
                }
            },
            onError: error => {
                if (typeof onError === "function") {
                    onError({ ...error });
                }
            }
        });
    }
});

const findOneEntity = createAction(ENTITY_FIND, {
    middleware({ action, next }) {
        next(action);

        const { entity, fields, variables, onSuccess, onError } = action.payload;
        const generatedQuery = generateFindOneQuery({ entity, fields });
        graphqlQuery({
            ...generatedQuery,
            variables,
            onSuccess: data => {
                if (typeof onSuccess === "function") {
                    onSuccess({ ...data.data });
                }
            },
            onError: error => {
                if (typeof onError === "function") {
                    onError({ ...error });
                }
            }
        });
    }
});

const saveEntity = createAction(ENTITY_SAVE, {
    middleware({ action, next }) {
        next(action);
        if (action.payload.data.id) {
            updateEntity(action.payload);
        } else {
            createEntity(action.payload);
        }
    }
});

const createEntity = createAction(ENTITY_CREATE, {
    middleware({ action, next }) {
        next(action);
        const { entity, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateCreateQuery({ entity, fields });

        graphqlMutation({
            ...generatedQuery,
            variables: { data, id: data.id },
            onSuccess: data => {
                if (typeof onSuccess === "function") {
                    onSuccess({ ...data.data });
                }
            },
            onError: error => {
                if (typeof onError === "function") {
                    onError({ ...error });
                }
            }
        });
    }
});

const updateEntity = createAction(ENTITY_UPDATE, {
    middleware({ action, next }) {
        next(action);
        const { entity, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateUpdateQuery({ entity, fields });

        console.log(generatedQuery);

        graphqlMutation({
            ...generatedQuery,
            variables: { data, id: data.id },
            onSuccess: data => {
                if (typeof onSuccess === "function") {
                    onSuccess({ ...data.data });
                }
            },
            onError: error => {
                if (typeof onError === "function") {
                    onError({ ...error });
                }
            }
        });
    }
});

export { listEntities, findOneEntity, createEntity, updateEntity, saveEntity };
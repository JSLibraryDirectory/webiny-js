// @flow
import { createAction } from "./../redux";
import { generateListQuery } from "./entity";
import { generateFindOneQuery } from "./entity";
import { graphql } from ".";

const PREFIX = "[ENTITY]";

export const ENTITY_LIST = `${PREFIX} List`;
export const ENTITY_FIND = `${PREFIX} Find`;

const listEntities = createAction(ENTITY_LIST, {
    middleware({ action, next }) {
        next(action);

        const { entity, fields, variables, onSuccess, onError } = action.payload;
        const generatedQuery = generateListQuery({ entity, fields });
        graphql({
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

const findOne = createAction(ENTITY_FIND, {
    middleware({ action, next }) {
        next(action);

        const { entity, fields, variables, onSuccess, onError } = action.payload;
        console.log(variables);
        const generatedQuery = generateFindOneQuery({ entity, fields });
        graphql({
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

export { listEntities, findOne };

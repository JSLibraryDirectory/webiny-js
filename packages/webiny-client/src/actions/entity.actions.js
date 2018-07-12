// @flow
import { createAction } from "./../redux";
import { generateListQuery } from "./entity";
import { graphql } from ".";

const PREFIX = "[ENTITY]";

export const ENTITY_LIST = `${PREFIX} List`;

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

export { listEntities };

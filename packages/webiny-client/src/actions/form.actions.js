// @flow
import { createAction } from "./../redux";
import { generateListQuery } from "./entity";
import { graphql } from ".";
import _ from "lodash";

const PREFIX = "[ENTITY]";

export const ENTITY_LIST = `${PREFIX} List`;
export const ENTITY_LIST_SUCCESS = `${PREFIX} List Success`;
export const ENTITY_LIST_ERROR = `${PREFIX} List Error`;

const listEntities = createAction(ENTITY_LIST, {
    middleware({ action, next }) {
        next(action);

        const { entity, fields, variables } = action.payload;
        const generatedQuery = generateListQuery({ entity, fields });
        graphql({
            ...generatedQuery,
            variables,
            onSuccess: data => listEntities.success({ data, entity, fields, variables }),
            onError: data => listEntities.error({ data, entity, fields, variables })
        });
    }
});

listEntities.success = createAction(ENTITY_LIST_SUCCESS, {
    key: "entities",
    reducer({ state, action }) {
        state = state || {};
        const { entity, data } = action.payload;
        _.set(state, `${entity}.lists.default`, { data, error: null });
        return state;
    }
});

listEntities.error = createAction(ENTITY_LIST_ERROR, {
    reducer({ state, action }) {
        state = state || {};
        const { entity, data } = action.payload;
        _.set(state, `${entity}.lists.default`, { data: null, error: data });

        return state;
    }
});

export { listEntities };

// @flow
import { createAction } from "./../redux";
import { listEntities } from ".";

const PREFIX = "[LIST]";

export const LIST_LOAD = `${PREFIX} Load`;
export const LIST_LOAD_SUCCESS = `${PREFIX} List Success`;
export const LIST_LOAD_ERROR = `${PREFIX} List Error`;

const loadList = createAction(LIST_LOAD, {
    middleware({ action, next }) {
        next(action);

        const { name, entity, fields, variables } = action.payload;
        listEntities({
            entity,
            fields,
            variables,
            onSuccess: data => loadList.success({ data, name }),
            onError: error => loadList.error({ error, name })
        });
    }
});

loadList.success = createAction(LIST_LOAD_SUCCESS, {
    selector: "lists",
    reducer({ state = {}, action }) {
        const { data, name } = action.payload;
        state[name] = {
            data,
            error: null
        };
        return state;
    }
});

loadList.error = createAction(LIST_LOAD_ERROR, {
    selector: "lists",
    reducer({ state = {}, action }) {
        const { error, name } = action.payload;
        state[name] = {
            error,
            data: null
        };
        return state;
    }
});

export { loadList };

// @flow
import { createAction } from "./../redux";
import { listEntities } from ".";

const PREFIX = "[LIST]";

export const LIST_SET_LOADING = `${PREFIX} Set Loading`;
export const LIST_LOAD = `${PREFIX} Load`;
export const LIST_LOAD_SUCCESS = `${PREFIX} List Success`;
export const LIST_LOAD_ERROR = `${PREFIX} List Error`;

const listSelector = ({ action }) => {
    return "lists." + action.payload.name;
};

const setListLoading = createAction(LIST_SET_LOADING, {
    selector: listSelector,
    reducer: ({ state = {}, action }) => {
        const { loading } = action.payload;
        state.loading = loading;
        return state;
    }
});

const loadList = createAction(LIST_LOAD, {
    middleware({ action, next }) {
        next(action);

        const { name, entity, fields, variables } = action.payload;
        setListLoading({ name, loading: true });

        listEntities({
            entity,
            fields,
            variables,
            onSuccess: data => {
                setListLoading({ name, loading: false });
                loadListSuccess({ data, name });
            },
            onError: error => {
                setListLoading({ name, loading: false });
                loadListError({ error, name });
            }
        });
    }
});

const loadListSuccess = createAction(LIST_LOAD_SUCCESS, {
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

const loadListError = createAction(LIST_LOAD_ERROR, {
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

export { loadList, setListLoading, loadListError, loadListSuccess };

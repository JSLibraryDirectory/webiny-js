// @flow
import { createAction } from "./../redux";
import { findOne } from ".";

const PREFIX = "[FORM]";

export const FORM_SUBMIT = `${PREFIX} Submit`;
export const FORM_SET_LOADING = `${PREFIX} Set Loading`;
export const FORM_LOAD = `${PREFIX} Load`;
export const FORM_LOAD_SUCCESS = `${PREFIX} Form Load Success`;
export const FORM_LOAD_ERROR = `${PREFIX} Form Load Error`;

const loadForm = createAction(FORM_LOAD, {
    middleware({ action, next }) {
        next(action);

        const { name, entity, fields, id } = action.payload;
        findOne({
            entity,
            fields,
            variables: { id },
            onSuccess: data => loadForm.success({ data, name }),
            onError: error => loadForm.error({ error, name })
        });
    }
});

loadForm.success = createAction(FORM_LOAD_SUCCESS, {
    selector: "forms",
    reducer({ state = {}, action }) {
        const { data, name } = action.payload;
        state[name] = {
            data,
            error: null
        };
        return state;
    }
});

loadForm.error = createAction(FORM_LOAD_ERROR, {
    selector: "forms",
    reducer({ state = {}, action }) {
        const { error, name } = action.payload;
        state[name] = {
            error,
            data: null
        };
        return state;
    }
});

const setFormLoading = createAction(FORM_SET_LOADING, {
    selector: ({ action }) => {
        return "forms." + action.payload.name;
    },
    reducer: ({ state = {}, action }) => {
        const { loading } = action.payload;
        state.loading = loading;
        return state;
    }
});

const submitForm = createAction(FORM_SUBMIT, {
    middleware({ action, next }) {
        next(action);
        setFormLoading({ name: action.payload.name, loading: true });
    }
});

export { loadForm, submitForm };

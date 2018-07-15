// @flow
import { createAction } from "./../redux";
import { findOneEntity, saveEntity } from ".";

const PREFIX = "[FORM]";

export const FORM_SET_LOADING = `${PREFIX} Set Loading`;
export const FORM_LOAD = `${PREFIX} Load`;
export const FORM_LOAD_SUCCESS = `${PREFIX} Form Load Success`;
export const FORM_LOAD_ERROR = `${PREFIX} Form Load Error`;
export const FORM_SUBMIT = `${PREFIX} Submit`;
export const FORM_SUBMIT_SUCCESS = `${PREFIX} Form Submit Success`;
export const FORM_SUBMIT_ERROR = `${PREFIX} Form Submit Error`;

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

const loadForm = createAction(FORM_LOAD, {
    middleware({ action, next }) {
        next(action);

        const { name, entity, fields, id } = action.payload;
        findOneEntity({
            entity,
            fields,
            variables: { id },
            onSuccess: data => loadFormSuccess({ data, name }),
            onError: error => loadFormError({ error, name })
        });
    }
});

const loadFormSuccess = createAction(FORM_LOAD_SUCCESS, {
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

const loadFormError = createAction(FORM_LOAD_ERROR, {
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

const submitForm = createAction(FORM_SUBMIT, {
    middleware({ action, next }) {
        next(action);
        const { name } = action.payload;
        setFormLoading({ name, loading: true });

        saveEntity({
            ...action.payload,
            onSuccess: data => {
                submitFormSuccess({ data, name });
                setFormLoading({ name, loading: false });
            },
            onError: error => {
                submitFormError({ error, name });
                setFormLoading({ name, loading: false });
            }
        });
    }
});

const submitFormSuccess = createAction(FORM_SUBMIT_SUCCESS, {
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

const submitFormError = createAction(FORM_SUBMIT_ERROR, {
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

export { loadForm, submitForm };

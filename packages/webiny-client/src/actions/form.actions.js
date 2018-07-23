// @flow
import { createAction } from "./../redux";
import { findOneEntity, saveEntity } from ".";

const PREFIX = "[FORM]";

export const FORM_SET_LOADING = `${PREFIX} Set Loading`;
export const FORM_RESET = `${PREFIX} Reset`;
export const FORM_LOAD = `${PREFIX} Load`;
export const FORM_LOAD_SUCCESS = `${PREFIX} Form Load Success`;
export const FORM_LOAD_ERROR = `${PREFIX} Form Load Error`;
export const FORM_SUBMIT = `${PREFIX} Submit`;
export const FORM_SUBMIT_SUCCESS = `${PREFIX} Form Submit Success`;
export const FORM_SUBMIT_ERROR = `${PREFIX} Form Submit Error`;

const formSelector = ({ action }) => {
    return "forms." + action.payload.name;
};

const setFormLoading = createAction(FORM_SET_LOADING, {
    selector: formSelector,
    reducer: ({ state = {}, action }) => {
        const { loading } = action.payload;
        state.loading = loading;
        return state;
    }
});

const resetForm = createAction(FORM_RESET, {
    selector: formSelector,
    reducer: () => {
        return {};
    }
});

const loadForm = createAction(FORM_LOAD, {
    middleware({ action, next }) {
        next(action);
        const { name, entity, fields, id } = action.payload;
        setFormLoading({ name, loading: true });
        findOneEntity({
            entity,
            fields,
            variables: { id },
            onSuccess: data => {
                setFormLoading({ name, loading: false });
                loadFormSuccess({ data, name });
            },
            onError: error => {
                setFormLoading({ name, loading: false });
                loadFormError({ error, name });
            }
        });
    }
});

const loadFormSuccess = createAction(FORM_LOAD_SUCCESS, {
    selector: formSelector,
    reducer({ action }) {
        const { data } = action.payload;
        return {
            data,
            error: null
        };
    }
});

const loadFormError = createAction(FORM_LOAD_ERROR, {
    selector: formSelector,
    reducer({ action }) {
        const { error } = action.payload;
        return {
            data: null,
            error
        };
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
    selector: formSelector,
    reducer({ action }) {
        const { data } = action.payload;
        return {
            data,
            error: null
        };
    }
});

const submitFormError = createAction(FORM_SUBMIT_ERROR, {
    selector: formSelector,
    reducer({ action }) {
        const { error } = action.payload;
        return {
            error,
            data: null
        };
    }
});

export { loadForm, submitForm, resetForm };

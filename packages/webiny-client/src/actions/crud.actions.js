// @flow
import { createAction } from "./../redux";
import { graphqlQuery, graphqlMutation } from ".";
import {
    generateListQuery,
    generateOneQuery,
    generateUpdateQuery,
    generateCreateQuery,
    generateDeleteQuery
} from "./crud";

import _ from "lodash";

const PREFIX = "[CRUD]";

export const TYPE_LIST = `${PREFIX} List`;
export const TYPE_ONE = `${PREFIX} Find`;
export const TYPE_SAVE = `${PREFIX} Save`;
export const TYPE_CREATE = `${PREFIX} Create`;
export const TYPE_UPDATE = `${PREFIX} Update`;
export const TYPE_DELETE = `${PREFIX} Delete`;

const typeList = createAction(TYPE_LIST, {
    middleware({ action, next }) {
        next(action);

        const {
            type,
            fields,
            page,
            perPage,
            search,
            sort,
            filter,
            onSuccess,
            onError
        } = action.payload;

        const query = generateListQuery({ type, fields });

        graphqlQuery({
            query,
            variables: { page, perPage, sort, filter, search },
            onSuccess: response => {
                const data = _.get(response, ["data", type, "list"].join("."));
                if (typeof onSuccess === "function") {
                    onSuccess(data);
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

const typeOne = createAction(TYPE_ONE, {
    middleware({ action, next }) {
        next(action);

        const { type, fields, variables, onSuccess, onError } = action.payload;
        const generatedQuery = generateOneQuery({ type, fields });
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

const typeSave = createAction(TYPE_SAVE, {
    middleware({ action, next }) {
        next(action);
        if (action.payload.data.id) {
            typeUpdate(action.payload);
        } else {
            typeCreate(action.payload);
        }
    }
});

const typeCreate = createAction(TYPE_CREATE, {
    middleware({ action, next }) {
        next(action);
        const { type, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateCreateQuery({ type, fields });

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

const typeUpdate = createAction(TYPE_UPDATE, {
    middleware({ action, next }) {
        next(action);
        const { type, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateUpdateQuery({ type, fields });

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

const typeDelete = createAction(TYPE_DELETE, {
    middleware({ action, next }) {
        next(action);
        const { type, fields, onSuccess, onError, id } = action.payload;
        const query = generateDeleteQuery({ type, fields });

        graphqlQuery({
            query,
            variables: { id },
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

export { typeList, typeOne, typeCreate, typeUpdate, typeSave, typeDelete };

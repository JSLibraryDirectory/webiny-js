// @flow
import { createAction } from "./../redux";
import { graphqlQuery, graphqlMutation } from ".";
import {
    generateListQuery,
    generateFindOneQuery,
    generateUpdateQuery,
    generateCreateQuery,
    generateDeleteQuery
} from "./crud";

import _ from "lodash";

const PREFIX = "[CRUD]";

export const CRUD_LIST = `${PREFIX} List`;
export const CRUD_FIND = `${PREFIX} Find`;
export const CRUD_SAVE = `${PREFIX} Save`;
export const CRUD_CREATE = `${PREFIX} Create`;
export const CRUD_UPDATE = `${PREFIX} Update`;
export const CRUD_DELETE = `${PREFIX} Delete`;

const list = createAction(CRUD_LIST, {
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

        const generatedQuery = generateListQuery({ type, fields });

        graphqlQuery({
            ...generatedQuery,
            variables: { page, perPage, sort, filter, search },
            onSuccess: response => {
                const data = _.get(response, ["data", type, "list"].join("."));
                if (typeof onSuccess === "function") {
                    console.log('saljem data', data);
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

const findOneCrud = createAction(CRUD_FIND, {
    middleware({ action, next }) {
        next(action);

        const { crud, fields, variables, onSuccess, onError } = action.payload;
        const generatedQuery = generateFindOneQuery({ crud, fields });
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

const saveCrud = createAction(CRUD_SAVE, {
    middleware({ action, next }) {
        next(action);
        if (action.payload.data.id) {
            updateCrud(action.payload);
        } else {
            createCrud(action.payload);
        }
    }
});

const createCrud = createAction(CRUD_CREATE, {
    middleware({ action, next }) {
        next(action);
        const { crud, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateCreateQuery({ crud, fields });

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

const updateCrud = createAction(CRUD_UPDATE, {
    middleware({ action, next }) {
        next(action);
        const { crud, fields, onSuccess, onError, data } = action.payload;
        const generatedQuery = generateUpdateQuery({ crud, fields });

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

const deleteCrud = createAction(CRUD_DELETE, {
    middleware({ action, next }) {
        next(action);
        const { crud, fields, onSuccess, onError, id } = action.payload;
        const generatedQuery = generateDeleteQuery({ crud, fields });

        graphqlMutation({
            ...generatedQuery,
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

export { list, findOneCrud, createCrud, updateCrud, saveCrud, deleteCrud };

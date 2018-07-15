// @flow
import { createAction } from "./../redux";
import { app } from "webiny-client";
import GraphQLError from "./../graphql/Error";

const generateApi = (promise, dataKey) => {
    return promise
        .then(({ data }) => {
            return data[dataKey];
        })
        .catch(error => {
            throw GraphQLError.from(error);
        });
};

const PREFIX = "[GRAPHQL]";

export const GRAPHQL_MUTATION = `${PREFIX} Mutation`;
export const GRAPHQL_QUERY = `${PREFIX} Query`;
export const GRAPHQL_SUCCESS = `${PREFIX} Success`;
export const GRAPHQL_ERROR = `${PREFIX} Error`;

export const graphqlSuccess = createAction(GRAPHQL_SUCCESS);
export const graphqlError = createAction(GRAPHQL_ERROR);

export const graphqlQuery = createAction(GRAPHQL_QUERY, {
    middleware({ action, next }) {
        next(action);

        const { query, variables, methodName, onSuccess, onError } = action.payload;
        generateApi(app.graphql.query({ query, variables }), methodName)
            .then(data => {
                graphqlSuccess(data);
                if (onSuccess) {
                    onSuccess({ data });
                }
            })
            .catch(error => {
                graphqlError(error);
                if (onError) {
                    onError({ error });
                }
            });
    }
});

export const graphqlMutation = createAction(GRAPHQL_MUTATION, {
    middleware({ action, next }) {
        next(action);

        const { mutation, variables, methodName, onSuccess, onError } = action.payload;
        generateApi(app.graphql.mutate({ mutation, variables }), methodName)
            .then(data => {
                graphqlSuccess(data);
                if (onSuccess) {
                    onSuccess({ data });
                }
            })
            .catch(error => {
                graphqlError(error);
                if (onError) {
                    onError({ error });
                }
            });
    }
});

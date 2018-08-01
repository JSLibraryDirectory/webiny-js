// @flow
import { createAction } from "./../redux";
import { app } from "webiny-app";
import GraphQLError from "./../graphql/Error";

const generateApi = (promise, dataKey) => {
    return promise
        .then(({ data }) => {
            console.log(data);
            return data[dataKey];
        })
        .catch(error => {
            throw GraphQLError.from(error);
        });
};

const PREFIX = "[GRAPHQL]";

export const GRAPHQL_MUTATION = `${PREFIX} Mutation`;
export const GRAPHQL_QUERY = `${PREFIX} Query`;
export const GRAPHQL_START = `${PREFIX} Start`;
export const GRAPHQL_FINISH = `${PREFIX} Finish`;
export const GRAPHQL_SUCCESS = `${PREFIX} Success`;
export const GRAPHQL_ERROR = `${PREFIX} Error`;

export const graphqlSuccess = createAction(GRAPHQL_SUCCESS);
export const graphqlError = createAction(GRAPHQL_ERROR);

export const graphqlStart = createAction(GRAPHQL_START, {
    selector: "graphql.activeOperationsCount",
    reducer({ state = 0 }) {
        return Number(state) + 1;
    }
});

export const graphqlFinish = createAction(GRAPHQL_FINISH, {
    selector: "graphql.activeOperationsCount",
    reducer({ state = 0 }) {
        return Number(state) - 1;
    }
});

export const graphqlQuery = createAction(GRAPHQL_QUERY, {
    async middleware({ action, next }) {
        next(action);

        graphqlStart();
        const { query, variables, onSuccess } = action.payload;
        const response = await app.graphql.query({ query, variables });

        graphqlFinish();
        graphqlSuccess(response);
        if (onSuccess) {
            onSuccess(response);
        }
    }
});

export const graphqlMutation = createAction(GRAPHQL_MUTATION, {
    middleware({ action, next }) {
        next(action);

        graphqlStart();
        const { mutation, variables, methodName, onSuccess, onError } = action.payload;
        generateApi(app.graphql.mutate({ mutation, variables }), methodName)
            .then(data => {
                graphqlFinish();
                graphqlSuccess(data);
                if (onSuccess) {
                    onSuccess({ data });
                }
            })
            .catch(error => {
                graphqlFinish();
                graphqlError(error);
                if (onError) {
                    onError({ error });
                }
            });
    }
});
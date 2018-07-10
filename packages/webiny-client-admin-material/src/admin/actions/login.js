import { createAction, graphQLAction } from "webiny-client/redux";

const PREFIX = "[SECURITY]";

export const SECURITY_SUBMIT_LOGIN = `${PREFIX} Submit login`;

const graphQLAction = (payloadCreator) => {
    return createAction(SECURITY_SUBMIT_LOGIN, {
        middleware({ store, action }) {
            store.dispatch({
                type: "GRAPHQL",
                payload: payloadCreator(action)
            });
        }
    });
};

export const submitLogin = createAction(SECURITY_SUBMIT_LOGIN, {
    middleware({ store, action }) {
        store.dispatch({
            type: "GRAPHQL",
            payload: {
                data: action.payload.data,
                graphql: {
                    /* ... */
                }
            }
        });
    }
});

export const abc = graphQLAction(SECURITY_SUBMIT_LOGIN, action => ({
    entity: "securityLogin",
    data: action.payload.data
}));

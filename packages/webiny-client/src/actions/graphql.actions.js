// @flow
import { createAction } from "./../redux";

const PREFIX = "[WEBINY]";

export const GRAPHQL = `${PREFIX} GraphQL`;

export const graphql = createAction(GRAPHQL, {
    async middleware({ action, next }) {
        next(action);

        console.log('ide graphql call');
    }
});

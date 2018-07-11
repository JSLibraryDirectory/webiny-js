// @flow
import { createAction } from "webiny-client/redux";
import { authenticate } from "webiny-client/actions";

const PREFIX = "[SECURITY]";

export const SECURITY_SUBMIT_AUTHENTICATE = `${PREFIX} Submit authenticate`;

export const submitAuthenticate = createAction(SECURITY_SUBMIT_AUTHENTICATE, {
    middleware({ action, next }) {
        next(action);
        authenticate(action.payload);
    }
});

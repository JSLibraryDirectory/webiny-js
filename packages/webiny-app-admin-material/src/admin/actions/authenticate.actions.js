// @flow
import { createAction } from "webiny-app/redux";
import { authenticate } from "webiny-app/actions";

const PREFIX = "[SECURITY]";

export const SECURITY_SUBMIT_AUTHENTICATE = `${PREFIX} Submit authenticate`;

export const submitAuthenticate = createAction(SECURITY_SUBMIT_AUTHENTICATE, {
    middleware({ action, next }) {
        next(action);
        authenticate(action.payload);
    }
});

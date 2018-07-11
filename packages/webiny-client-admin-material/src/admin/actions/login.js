// @flow
import { createAction } from "webiny-client/redux";
import { authenticate } from "webiny-client/actions";

const PREFIX = "[SECURITY]";

export const SECURITY_SUBMIT_LOGIN = `${PREFIX} Submit login`;

export const submitLogin = createAction(SECURITY_SUBMIT_LOGIN, {
    middleware({ action, next }) {
        next(action);
        authenticate(action.payload);
    }
});

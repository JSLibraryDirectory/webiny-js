// @flow
import { createAction } from "./../redux";
import { app } from "./..";
const SECURITY = "[SECURITY]";

export const AUTH = `${SECURITY} Authenticate`;
export const AUTH_SUCCESS = `${SECURITY} Authentication successful`;
export const AUTH_ERROR = `${SECURITY} Authentication failed`;

export const authenticationSuccess = createAction(AUTH_SUCCESS, {
    key: "security.authentication",
    reducer({ action }) {
        return {
            error: null,
            user: action.payload,
            inProgress: false
        };
    }
});

export const authenticationError = createAction(AUTH_ERROR, {
    key: "security.authentication",
    reducer({ action }) {
        return {
            error: action.payload,
            user: null,
            inProgress: false
        };
    }
});

export const authenticate = createAction(AUTH, {
    key: "security.authentication.inProgress",
    reducer() {
        return true;
    },
    async middleware({ action, next }) {
        next(action);

        const security = app.security;
        try {
            const { identity, strategy, ...authenticationPayload } = action.payload;
            const result = await security.login(identity, strategy, authenticationPayload);

            if (result.token) {
                authenticationSuccess(result);
            } else {
                throw Error("Token not received.");
            }
        } catch (e) {
            authenticationError(e);
        }
    }
});

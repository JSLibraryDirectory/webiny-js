// @flow
import { createAction } from "webiny-client/redux";

const PREFIX = "[ADMIN_SNACKBAR]";

export const SHOW_SNACKBAR = `${PREFIX} Show`;
export const HIDE_SNACKBAR = `${PREFIX} Hide`;

const showSnackbar = createAction(SHOW_SNACKBAR, {
    selector: "ui.snackbar",
    reducer: ({ action }) => action.payload
});

const hideSnackbar = createAction(HIDE_SNACKBAR, {
    selector: "ui.snackbar",
    reducer: () => null
});

export { showSnackbar, hideSnackbar };

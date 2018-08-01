// @flow
import { createAction } from "webiny-app/redux";

const PREFIX = "[ADMIN_MENU]";

export const SHOW_MENU = `${PREFIX} Show`;
export const HIDE_MENU = `${PREFIX} Hide`;
export const TOGGLE_MENU = `${PREFIX} Toggle`;

const showMenu = createAction(SHOW_MENU, {
    selector: "admin.showMenu",
    reducer: () => true
});

const hideMenu = createAction(HIDE_MENU, {
    selector: "admin.showMenu",
    reducer: () => false
});

const toggleMenu = createAction(TOGGLE_MENU, {
    selector: "admin.showMenu",
    reducer: ({ state }) => !state
});

export { showMenu, hideMenu, toggleMenu };

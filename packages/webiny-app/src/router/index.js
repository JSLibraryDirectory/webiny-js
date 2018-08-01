// @flow
import { Router } from "webiny-react-router";
export const router = new Router();
export { default as authenticationMiddleware } from "./authentication";
export {
    RouterComponent as Router,
    renderMiddleware,
    resolveMiddleware
} from "webiny-react-router";

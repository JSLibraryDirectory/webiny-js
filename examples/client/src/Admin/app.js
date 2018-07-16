import React from "react";
import {
    app,
    resolveMiddleware,
    renderMiddleware,
    authenticationMiddleware,
    Router
} from "webiny-client";
import { app as adminApp } from "webiny-client-admin-material";
import { app as cmsAdminApp } from "webiny-client-cms/admin";
import userIdentity from "./userIdentity";
import apiConfig from "./../apiConfig";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";

if (!app.initialized) {
    app.use(adminApp());
    app.use(cmsAdminApp());

    app.configure(() => {
        return apiConfig(app);
    });

    app.router.configure({
        basename: "/admin",
        middleware: [
            authenticationMiddleware({
                onNotAuthenticated({ route }, next) {
                    if (route.name !== "Login") {
                        app.router.goToRoute("Login");
                    }
                    next();
                }
            }),
            resolveMiddleware(),
            renderMiddleware()
        ]
    });

    app.router.addRoute({
        name: "Dashboard",
        path: "/",
        route: "Cms.Page.List"
    });

    app.security.configure({
        cookie: "webiny-token",
        // TODO: define strategies like on server side
        identities: [userIdentity],
        onLogout() {
            app.router.goToRoute("Login");
        }
    });
}

const App = ({ store }) => {
    return (
        <Provider store={store}>
            <Router router={app.router} />
        </Provider>
    );
};

export default hot(module)(App);

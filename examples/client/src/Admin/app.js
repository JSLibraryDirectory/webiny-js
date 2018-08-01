// @flow
import React from "react";
import { app } from "webiny-app";
import {
    router,
    Router,
    resolveMiddleware,
    renderMiddleware,
    authenticationMiddleware
} from "webiny-app/router";

import { app as adminApp } from "webiny-app-admin";
import userIdentity from "./userIdentity";
import apiConfig from "./../apiConfig";
import { hot } from "react-hot-loader";
import { Provider } from "react-redux";

if (!app.initialized) {
    app.use(adminApp());

    app.configure(() => {
        return apiConfig(app);
    });

    router.configure({
        basename: "/admin",
        middleware: [
            authenticationMiddleware({
                onNotAuthenticated({ route }, next) {
                    if (route.name !== "Login") {
                        router.goToRoute("Login");
                    }
                    next();
                }
            }),
            resolveMiddleware(),
            renderMiddleware()
        ]
    });

    app.security.configure({
        cookie: "webiny-token",
        // TODO: define strategies like on server side
        identities: [userIdentity],
        onLogout() {
            router.goToRoute("Login");
        }
    });
}

const App = ({ store }) => {
    return (
        <Provider store={store}>
            <Router router={router} />
        </Provider>
    );
};

export default hot(module)(App);

// @flow
import { app } from "webiny-app";
import { app as uiApp } from "webiny-ui";
import MenuService from "./services/Menu";
import Menu from "./components/Menu";
import { i18n } from "webiny-app";
import React from "react";
import "./admin/actions";
import { ReactComponent as SecurityIcon } from "./assets/images/icons/baseline-security-24px.svg";

const t = i18n.namespace("Admin.App");

import UsersForm from "./admin/views/UsersForm";
import UsersList from "./admin/views/UsersList";
import ApiTokensForm from "./admin/views/ApiTokensForm";
import ApiTokensList from "./admin/views/ApiTokensList";
import GroupsForm from "./admin/views/GroupsForm";
import GroupsList from "./admin/views/GroupsList";
import PoliciesForm from "./admin/views/PoliciesForm";
import PoliciesList from "./admin/views/PoliciesList";

export default () => {
    return (params, next) => {
        Promise.all([new Promise(res => uiApp()(params, res))]).then(() => {
            app.services.register("menu", () => new MenuService());

            app.router.addRoute({
                name: "Login",
                path: "/login",
                exact: true,
                render: () =>
                    app.modules.load("Admin.Login").then(Login => {
                        return (
                            <Login
                                identity={"SecurityUser"}
                                strategy={"credentials"}
                                onSuccess={() => {
                                    app.router.goToRoute("Users.List");
                                }}
                            />
                        );
                    }),
                title: "Login"
            });

            app.router.addRoute({
                name: "Me.Account",
                path: "/me",
                render: () =>
                    app.modules.load("Admin.UserAccountForm").then(AccountForm => {
                        return <AccountForm />;
                    }),
                title: "My Account"
            });

            // Security management module.
            app.modules.register({
                name: "Security.SecurityToggleList",
                factory: () => import("./admin/views/SecurityToggleList")
            });

            const securityManager = "webiny-security-manager";

            app.services.get("menu").add(
                <Menu label={t`Security`} icon={<SecurityIcon />}>
                    <Menu label={t`Identities`} group={securityManager}>
                        <Menu label={t`Users`} route="Users.List" />
                        <Menu label={t`API Tokens`} route="ApiTokens.List" />
                    </Menu>
                    <Menu label={t`User Management`} group={securityManager}>
                        <Menu label={t`Groups`} route="Groups.List" />
                        <Menu label={t`Policies`} route="Policies.List" />
                    </Menu>
                </Menu>
            );

            app.router.addRoute({
                name: "Users.Create",
                path: "/users/new",
                component: UsersForm,
                title: "Security - Create User",
                group: securityManager
            });

            app.router.addRoute({
                name: "Users.Edit",
                path: "/users/:id",
                component: UsersForm,
                title: "Security - Edit User",
                group: securityManager
            });

            app.router.addRoute({
                name: "Users.List",
                path: "/users",
                component: UsersList,
                title: "Security - Users",
                group: securityManager
            });

            app.router.addRoute({
                name: "Users.List.Edit",
                path: "/users/:id",
                component: UsersList,
                title: "Security - Users",
                group: securityManager
            });

            app.router.addRoute({
                name: "ApiTokens.Create",
                path: "/api-tokens/new",
                component: ApiTokensForm,
                title: "Security - Create Token",
                group: securityManager
            });

            app.router.addRoute({
                name: "ApiTokens.Edit",
                path: "/api-tokens/:id",
                component: ApiTokensForm,
                title: "Security - Edit Token",
                group: securityManager
            });

            app.router.addRoute({
                name: "ApiTokens.List",
                path: "/api-tokens",
                component: ApiTokensList,
                title: "Security - Tokens",
                group: securityManager
            });

            app.router.addRoute({
                name: "Groups.Create",
                path: "/groups/new",
                component: GroupsForm,
                title: "Security - Create Group",
                group: securityManager
            });

            app.router.addRoute({
                name: "Groups.Edit",
                path: "/groups/:id",
                component: GroupsForm,
                title: "Security - Edit Group",
                group: securityManager
            });

            app.router.addRoute({
                name: "Groups.List",
                path: "/groups",
                component: GroupsList,
                title: "Security - Groups",
                group: securityManager
            });

            app.router.addRoute({
                name: "Policies.Create",
                path: "/policies/new",
                component: PoliciesForm,
                title: "Security - Create Policy",
                group: securityManager
            });

            app.router.addRoute({
                name: "Policies.Edit",
                path: "/policies/:id",
                component: PoliciesForm,
                title: "Security - Edit Policy",
                group: securityManager
            });

            app.router.addRoute({
                name: "Policies.List",
                path: "/policies",
                component: PoliciesList,
                title: "Security - Policies",
                group: securityManager
            });

            next();
        });
    };
};

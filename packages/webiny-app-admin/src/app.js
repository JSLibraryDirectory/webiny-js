// @flow
import React from "react";
import { i18n } from "webiny-app/i18n";
import { router } from "webiny-app/router";
import { addPlugin } from "webiny-app/plugins";
import "./admin/actions";
import { ReactComponent as SecurityIcon } from "./assets/images/icons/baseline-security-24px.svg";

const t = i18n.namespace("Admin.App");

import Login from "./admin/views/Login";
import PoliciesList from "./admin/views/PoliciesList";
import PoliciesForm from "./admin/views/PoliciesForm";

/*
import UsersForm from "./admin/views/UsersForm";
import UsersList from "./admin/views/UsersList";
import ApiTokensForm from "./admin/views/ApiTokensForm";
import ApiTokensList from "./admin/views/ApiTokensList";
import GroupsForm from "./admin/views/GroupsForm";
import GroupsList from "./admin/views/GroupsList";
*/

// TODO: Provjeri dali ovo jos trebas: "./admin/views/SecurityToggleList"
// to je bilo kroz module loader registrirano, ali ne mogu naci uopce di to koristis

const securityManager = "webiny-security-manager";

export default () => {
    return (params, next) => {
        // Add menu plugin
        addPlugin({
            name: "security-menu",
            type: "menu",
            render({ Menu }) {
                return (
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
            }
        });

        // Add routes
        router.addRoute({
            name: "Login",
            path: "/login",
            exact: true,
            title: "Login",
            render() {
                return (
                    <Login
                        identity={"SecurityUser"}
                        strategy={"credentials"}
                        onSuccess={() => router.goToRoute("Policies.List")}
                    />
                );
            }
        });

        router.addRoute({
            name: "Policies.Edit",
            path: "/policies/:id",
            component: PoliciesForm,
            title: "Security - Edit Policy",
            group: securityManager
        });

        router.addRoute({
            name: "Policies.List",
            path: "/policies",
            title: "Security - Policies",
            component: () => PoliciesList,
            group: securityManager
        });

        /*
        router.addRoute({
            name: "Users.Create",
            path: "/users/new",
            component: UsersForm,
            title: "Security - Create User",
            group: securityManager
        });

        router.addRoute({
            name: "Users.Edit",
            path: "/users/:id",
            component: UsersForm,
            title: "Security - Edit User",
            group: securityManager
        });

        router.addRoute({
            name: "Users.List",
            path: "/users",
            component: UsersList,
            title: "Security - Users",
            group: securityManager
        });

        router.addRoute({
            name: "Users.List.Edit",
            path: "/users/:id",
            component: UsersList,
            title: "Security - Users",
            group: securityManager
        });

        router.addRoute({
            name: "ApiTokens.Create",
            path: "/api-tokens/new",
            component: ApiTokensForm,
            title: "Security - Create Token",
            group: securityManager
        });

        router.addRoute({
            name: "ApiTokens.Edit",
            path: "/api-tokens/:id",
            component: ApiTokensForm,
            title: "Security - Edit Token",
            group: securityManager
        });

        router.addRoute({
            name: "ApiTokens.List",
            path: "/api-tokens",
            component: ApiTokensList,
            title: "Security - Tokens",
            group: securityManager
        });

        router.addRoute({
            name: "Groups.Create",
            path: "/groups/new",
            component: GroupsForm,
            title: "Security - Create Group",
            group: securityManager
        });

        router.addRoute({
            name: "Groups.Edit",
            path: "/groups/:id",
            component: GroupsForm,
            title: "Security - Edit Group",
            group: securityManager
        });

        router.addRoute({
            name: "Groups.List",
            path: "/groups",
            component: GroupsList,
            title: "Security - Groups",
            group: securityManager
        });

        router.addRoute({
            name: "Policies.Create",
            path: "/policies/new",
            component: PoliciesForm,
            title: "Security - Create Policy",
            group: securityManager
        });

*/
        next();
    };
};

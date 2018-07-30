// @flow
import React from "react";
import { app, inject } from "webiny-client";
import { Icon } from "webiny-client-ui-material/Icon";
import {
    TopAppBar,
    TopAppBarSection,
    TopAppBarActionItem,
    TopAppBarTitle
} from "webiny-client-ui-material/TopAppBar";

import { compose } from "recompose";

import { ReactComponent as MenuIcon } from "./icons/baseline-menu-24px.svg";
import { ReactComponent as NotificationIcon } from "./icons/baseline-notification_important-24px.svg";

import { toggleMenu } from "./../actions/menu.actions";

class Header extends React.Component {
    render() {
        return (
            <TopAppBar>
                <TopAppBarSection alignStart>
                    <Icon icon={<MenuIcon />} onClick={toggleMenu} />
                    <TopAppBarTitle>Webiny</TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                    <TopAppBarActionItem>
                        <Icon icon={<NotificationIcon />} />
                    </TopAppBarActionItem>
                </TopAppBarSection>
            </TopAppBar>
        );
    }
}

export default compose(
    inject({
        modules: [
            {
                components: () =>
                    app.modules.loadByTag("header-component").then(modules => {
                        return Object.values(modules).filter(m => m);
                    })
            }
        ]
    })
)(Header);

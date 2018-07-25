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

import menuIcon from "./icons/baseline-menu-24px.svg";
import { toggleMenu } from "./../actions/menu.actions";

class Header extends React.Component {
    render() {
        return (
            <TopAppBar>
                <TopAppBarSection alignStart>
                    <Icon src={menuIcon} onClick={toggleMenu} />
                    <TopAppBarTitle>Webiny</TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                    <TopAppBarActionItem aria-label="Download" alt="Download">
                        <Icon name={"question-circle"} />
                    </TopAppBarActionItem>
                    <TopAppBarActionItem aria-label="Print this page" alt="Print this page">
                        <Icon name={"bell"} />
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

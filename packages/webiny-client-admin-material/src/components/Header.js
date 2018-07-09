// @flow
import React, { createElement, isValidElement } from "react";
import { app, inject } from "webiny-client";
import Icon from "webiny-client-ui-material/Icon";

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarActionItem,
    TopAppBarTitle
} from "rmwc/TopAppBar";

@inject({
    modules: [
        {
            components: () =>
                app.modules.loadByTag("header-component").then(modules => {
                    return Object.values(modules).filter(m => m);
                })
        }
    ]
})
class Header extends React.Component {
    render() {
        return (
            <TopAppBar>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <Icon name={"bars"} onClick={() => window.menu(true)} /> {/* TODO */}
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
                </TopAppBarRow>
            </TopAppBar>
        );
    }
    __render() {
        const { components } = this.props.modules;
        return (
            <div className="navbar navbar-inverse" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="nav">
                        <span />
                        <span />
                        <span />
                    </button>
                    {components.map((cmp, index) => {
                        return (
                            cmp &&
                            React.cloneElement(isValidElement(cmp) ? cmp : createElement(cmp), {
                                key: index
                            })
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Header;

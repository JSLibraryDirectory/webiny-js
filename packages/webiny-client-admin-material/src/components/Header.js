// @flow
import React from "react";
import { app, inject } from "webiny-client";
import { Menu, MenuDivider } from "webiny-client-ui-material/Menu";
import { IconButton } from "webiny-client-ui-material/Button";
import { Icon } from "webiny-client-ui-material/Icon";
import { List } from "webiny-client-ui-material/List";
import { css } from "emotion";

import {
    TopAppBar,
    TopAppBarSection,
    TopAppBarActionItem,
    TopAppBarTitle
} from "webiny-client-ui-material/TopAppBar";

import { compose } from "recompose";

import { ReactComponent as MenuIcon } from "./icons/baseline-menu-24px.svg";
import { ReactComponent as DarkModeIcon } from "./icons/round-invert_colors-24px.svg";
import { ReactComponent as HelpIcon } from "./icons/round-help-24px.svg";
import { ReactComponent as SendFeedbackIcon } from "./icons/round-feedback-24px.svg";
import { ReactComponent as SignOutIcon } from "./icons/round-lock_open-24px.svg";
import { ReactComponent as OpenInNewIcon } from "./icons/round-open_in_new-24px.svg";
import { ReactComponent as ChevronRightIcon } from "./icons/round-chevron_right-24px.svg";

import { toggleMenu } from "./../actions/menu.actions";

const smallerIcon = css(
    {},
    {
        ">svg": {
            transform: "scale(0.8)"
        }
    }
);

const menuDialog = css({
    minWidth: 300
});

const menuTitle = css(
    {
        backgroundColor: "var(--webiny-hover-active)",
        marginTop: "-15",
        marginBottom: -5,
        paddingTop: 15,
        paddingBottom: 15
    },
    {
        ">.mdc-list-item__text": {
            fontWeight: "bold"
        }
    }
);

const avatar = css({
    height: 40,
    width: 40,
    marginRight: 16,
    borderRadius: "50%",
    overflow: "hidden"
});

const avatarMenu = css({
    borderRadius: "50%",
    display: "block",
    width: 35
});

const avatarImage = "http://i.pravatar.cc/300";

class Header extends React.Component {
    render() {
        return (
            <TopAppBar>
                <TopAppBarSection alignStart>
                    <IconButton icon={<MenuIcon />} onClick={toggleMenu} />
                    <TopAppBarTitle>Webiny</TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                    <TopAppBarActionItem>
                        <Menu
                            className={menuDialog}
                            anchor={"topEnd"}
                            handle={
                                <img
                                    onClick={() => console.log("Button clicked")}
                                    src={avatarImage}
                                    className={avatarMenu}
                                />
                            }
                        >
                            <List>
                                <List.Item ripple={false} className={menuTitle}>
                                    <List.Item.Graphic className={avatar}>
                                        <img src={avatarImage} />
                                    </List.Item.Graphic>
                                    <List.Item.Text>
                                        John Doe
                                        <List.Item.Text.Secondary>
                                            john.doe@gmail.com
                                        </List.Item.Text.Secondary>
                                    </List.Item.Text>
                                </List.Item>
                                <MenuDivider />
                                <List.Item>
                                    <List.Item.Graphic>
                                        <Icon icon={<DarkModeIcon />} />
                                    </List.Item.Graphic>
                                    <List.Item.Text>Dark mode: off</List.Item.Text>
                                    <List.Item.Meta>
                                        <Icon icon={<ChevronRightIcon />} />
                                    </List.Item.Meta>
                                </List.Item>
                                <List.Item>
                                    <List.Item.Graphic>
                                        <Icon icon={<HelpIcon />} />
                                    </List.Item.Graphic>
                                    <List.Item.Text>Help</List.Item.Text>
                                    <List.Item.Meta className={smallerIcon}>
                                        <Icon icon={<OpenInNewIcon />} />
                                    </List.Item.Meta>
                                </List.Item>
                                <List.Item>
                                    <List.Item.Graphic>
                                        <Icon icon={<SendFeedbackIcon />} />
                                    </List.Item.Graphic>
                                    <List.Item.Text>Send feedback</List.Item.Text>
                                    <List.Item.Meta className={smallerIcon}>
                                        <Icon icon={<OpenInNewIcon />} />
                                    </List.Item.Meta>
                                </List.Item>
                                <MenuDivider />
                                <List.Item>
                                    <List.Item.Graphic>
                                        <Icon icon={<SignOutIcon />} />
                                    </List.Item.Graphic>
                                    <List.Item.Text>Sign out</List.Item.Text>
                                </List.Item>
                            </List>
                        </Menu>
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

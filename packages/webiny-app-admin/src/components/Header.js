// @flow
import React from "react";
import { Menu, MenuDivider } from "webiny-ui-material/Menu";
import { IconButton } from "webiny-ui-material/Button";
import { Icon } from "webiny-ui-material/Icon";
import {
    List,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemGraphic,
    ListItemMeta
} from "webiny-ui-material/List";

import { Switch } from "webiny-ui-material/Switch";
import { Form } from "webiny-form";
import { css } from "emotion";

import {
    TopAppBar,
    TopAppBarSection,
    TopAppBarActionItem,
    TopAppBarTitle
} from "webiny-ui-material/TopAppBar";

import { ReactComponent as MenuIcon } from "./icons/baseline-menu-24px.svg";
import { ReactComponent as DarkModeIcon } from "./icons/round-invert_colors-24px.svg";
import { ReactComponent as HelpIcon } from "./icons/round-help-24px.svg";
import { ReactComponent as SendFeedbackIcon } from "./icons/round-feedback-24px.svg";
import { ReactComponent as SignOutIcon } from "./icons/round-lock_open-24px.svg";
import { ReactComponent as OpenInNewIcon } from "./icons/round-open_in_new-24px.svg";

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
                    <IconButton icon={<MenuIcon />} onClick={() => toggleMenu()} />
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
                                <ListItem ripple={false} className={menuTitle}>
                                    <ListItemGraphic className={avatar}>
                                        <img src={avatarImage} />
                                    </ListItemGraphic>
                                    <ListItemText>
                                        John Doe
                                        <ListItemTextSecondary>
                                            john.doe@gmail.com
                                        </ListItemTextSecondary>
                                    </ListItemText>
                                </ListItem>
                                <MenuDivider />
                                <ListItem ripple={false}>
                                    <ListItemGraphic>
                                        <Icon icon={<DarkModeIcon />} />
                                    </ListItemGraphic>
                                    <ListItemText>Dark mode: </ListItemText>
                                    <ListItemMeta>
                                        <Form>
                                            {({ Bind }) => (
                                                <Bind name="darkMode">
                                                    <Switch />
                                                </Bind>
                                            )}
                                        </Form>
                                    </ListItemMeta>
                                </ListItem>
                                <ListItem>
                                    <ListItemGraphic>
                                        <Icon icon={<HelpIcon />} />
                                    </ListItemGraphic>
                                    <ListItemText>Help</ListItemText>
                                    <ListItemMeta className={smallerIcon}>
                                        <Icon icon={<OpenInNewIcon />} />
                                    </ListItemMeta>
                                </ListItem>
                                <ListItem>
                                    <ListItemGraphic>
                                        <Icon icon={<SendFeedbackIcon />} />
                                    </ListItemGraphic>
                                    <ListItemText>Send feedback</ListItemText>
                                    <ListItemMeta className={smallerIcon}>
                                        <Icon icon={<OpenInNewIcon />} />
                                    </ListItemMeta>
                                </ListItem>
                                <MenuDivider />
                                <ListItem>
                                    <ListItemGraphic>
                                        <Icon icon={<SignOutIcon />} />
                                    </ListItemGraphic>
                                    <ListItemText>Sign out</ListItemText>
                                </ListItem>
                            </List>
                        </Menu>
                    </TopAppBarActionItem>
                </TopAppBarSection>
            </TopAppBar>
        );
    }
}

export default Header;

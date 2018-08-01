// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../List/README.md";

import { Icon } from "./../Icon";
import { ButtonPrimary } from "./../Button";

import { ReactComponent as AutoRenewIcon } from "./icons/baseline-autorenew-24px.svg";
import { ReactComponent as CloudDoneIcon } from "./icons/baseline-cloud_done-24px.svg";
import { ReactComponent as BaselineDeleteIcon } from "./icons/baseline-delete-24px.svg";
import { ReactComponent as BaselineDoneIcon } from "./icons/baseline-done-24px.svg";

// $FlowFixMe
import {
    PropsType,
    List,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta,
    ListItemGraphic
} from "./List";

const story = storiesOf("Components/List", module);

story.add("simple list", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <Story.Sandbox.Example title={"A list with all possible options"}>
                    <List>
                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<AutoRenewIcon />} />
                            </ListItemGraphic>
                            <ListItemText>
                                Rocket
                                <ListItemTextSecondary>
                                    This could be a really cool rocket.
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <Icon icon={<CloudDoneIcon />} />
                            </ListItemMeta>
                        </ListItem>

                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<BaselineDeleteIcon />} />
                            </ListItemGraphic>
                            <ListItemText>
                                Coffee
                                <ListItemTextSecondary>A nice cup of coffee.</ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <Icon icon={<BaselineDoneIcon />} />
                            </ListItemMeta>
                        </ListItem>
                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<AutoRenewIcon />} />
                            </ListItemGraphic>
                            <ListItemText>
                                E-mail
                                <ListItemTextSecondary>
                                    Send an e-mail to your best friend.
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <ButtonPrimary>Send</ButtonPrimary>
                            </ListItemMeta>
                        </ListItem>
                    </List>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                        <List>
                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<AutoRenewIcon/>} />
                            </ListItemGraphic>
                            <ListItemText>
                                Rocket
                                <ListItemTextSecondary>
                                    This could be a really cool rocket.
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <Icon icon={<CloudDoneIcon/>} />
                            </ListItemMeta>
                        </ListItem>

                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<BaselineDeleteIcon/>} />
                            </ListItemGraphic>
                            <ListItemText>
                                Coffee
                                <ListItemTextSecondary>
                                    A nice cup of coffee.
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <Icon icon={<BaselineDoneIcon/>} />
                            </ListItemMeta>
                        </ListItem>
                        <ListItem>
                            <ListItemGraphic>
                                <Icon icon={<AutoRenewIcon/>} />
                            </ListItemGraphic>
                            <ListItemText>
                                E-mail
                                <ListItemTextSecondary>
                                    Send an e-mail to your best friend.
                                </ListItemTextSecondary>
                            </ListItemText>
                            <ListItemMeta>
                                <ButtonPrimary>
                                    Send
                                </ButtonPrimary>
                            </ListItemMeta>
                        </ListItem>
                    </List>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

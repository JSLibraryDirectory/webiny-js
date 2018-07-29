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
import { List, PropsType } from "./List";

const story = storiesOf("Components/List", module);

story.add("simple list", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <Story.Sandbox.Example title={"A list with all possible options"}>
                    <List>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<AutoRenewIcon />} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Rocket
                                <List.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon icon={<CloudDoneIcon />} />
                            </List.Item.Meta>
                        </List.Item>

                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<BaselineDeleteIcon />} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Coffee
                                <List.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon icon={<BaselineDoneIcon />} />
                            </List.Item.Meta>
                        </List.Item>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<AutoRenewIcon />} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                E-mail
                                <List.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <ButtonPrimary>Send</ButtonPrimary>
                            </List.Item.Meta>
                        </List.Item>
                    </List>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                        <List>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<AutoRenewIcon/>} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Rocket
                                <List.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon icon={<CloudDoneIcon/>} />
                            </List.Item.Meta>
                        </List.Item>

                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<BaselineDeleteIcon/>} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Coffee
                                <List.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon icon={<BaselineDoneIcon/>} />
                            </List.Item.Meta>
                        </List.Item>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon icon={<AutoRenewIcon/>} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                E-mail
                                <List.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <ButtonPrimary>
                                    Send
                                </ButtonPrimary>
                            </List.Item.Meta>
                        </List.Item>
                    </List>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

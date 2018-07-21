// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../List/README.md";

import Icon from "./../Icon";
import Button from "./../Button";

// $FlowFixMe
import { List, PropsType } from "./List";

import autoRenew from "./icons/baseline-autorenew-24px.svg";
import cloudDone from "./icons/baseline-cloud_done-24px.svg";
import baselineDelete from "./icons/baseline-delete-24px.svg";
import baselineDone from "./icons/baseline-done-24px.svg";
import envelope from "./icons/baseline-email-24px.svg";

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
                                <Icon src={autoRenew} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Rocket
                                <List.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon src={cloudDone} />
                            </List.Item.Meta>
                        </List.Item>

                        <List.Item>
                            <List.Item.Graphic>
                                <Icon src={baselineDelete} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Coffee
                                <List.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon src={baselineDone} />
                            </List.Item.Meta>
                        </List.Item>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon src={envelope} />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                E-mail
                                <List.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Button.Primary>Send</Button.Primary>
                            </List.Item.Meta>
                        </List.Item>
                    </List>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                        <List>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon name="rocket" />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Rocket
                                <List.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon name="info-circle" />
                            </List.Item.Meta>
                        </List.Item>

                        <List.Item>
                            <List.Item.Graphic>
                                <Icon name="coffee" />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                Coffee
                                <List.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Icon name="info-circle" />
                            </List.Item.Meta>
                        </List.Item>
                        <List.Item>
                            <List.Item.Graphic>
                                <Icon name="envelope" />
                            </List.Item.Graphic>
                            <List.Item.Text>
                                E-mail
                                <List.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </List.Item.Text.Secondary>
                            </List.Item.Text>
                            <List.Item.Meta>
                                <Button.Primary>
                                    Send
                                </Button.Primary>
                            </List.Item.Meta>
                        </List.Item>
                    </List>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

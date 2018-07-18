// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../PaginatedList/README.md";

import Icon from "./../Icon";
import Button from "./../Button";

// $FlowFixMe
import PaginatedList, { PropsType } from "./PaginatedList";

const story = storiesOf("Components/PaginatedList", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <Story.Sandbox.Example title={"A list with all possible options"}>
                    <PaginatedList>
                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="rocket" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                Rocket
                                <PaginatedList.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Icon name="info-circle" />
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>

                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="coffee" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                Coffee
                                <PaginatedList.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Icon name="info-circle" />
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>
                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="envelope" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                E-mail
                                <PaginatedList.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Button.Primary>Send</Button.Primary>
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>
                    </PaginatedList>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                        <PaginatedList>
                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="rocket" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                Rocket
                                <PaginatedList.Item.Text.Secondary>
                                    This could be a really cool rocket.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Icon name="info-circle" />
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>

                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="coffee" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                Coffee
                                <PaginatedList.Item.Text.Secondary>
                                    A nice cup of coffee.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Icon name="info-circle" />
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>
                        <PaginatedList.Item>
                            <PaginatedList.Item.Graphic>
                                <Icon name="envelope" />
                            </PaginatedList.Item.Graphic>
                            <PaginatedList.Item.Text>
                                E-mail
                                <PaginatedList.Item.Text.Secondary>
                                    Send an e-mail to your best friend.
                                </PaginatedList.Item.Text.Secondary>
                            </PaginatedList.Item.Text>
                            <PaginatedList.Item.Meta>
                                <Button.Primary>
                                    Send
                                </Button.Primary>
                            </PaginatedList.Item.Meta>
                        </PaginatedList.Item>
                    </PaginatedList>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

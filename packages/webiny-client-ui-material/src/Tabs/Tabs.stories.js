// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Tabs/README.md";

import { ReactComponent as DeleteIcon } from "./svg/baseline-delete-24px.svg";
import { ReactComponent as DoneIcon } from "./svg/baseline-done-24px.svg";

import { withKnobs, boolean } from "@storybook/addon-knobs";

// $FlowFixMe
import { Tabs, Tab, TabIcon, PropsType } from "./Tabs";

const story = storiesOf("Components/Tabs", module);

story.addDecorator(withKnobs);
story.add("usage", () => {
    const withScroll = boolean("withScroll", true);

    const Div = props => {
        return <div style={{ padding: 50 }}>{props.children}</div>;
    };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"Tabs example"}>
                <Story.Sandbox.Example>
                    <div style={{ overflow: "hidden" }}>
                        <Tabs withScroll={withScroll}>
                            <Tab label="Tab 1" icon={<TabIcon icon={<DeleteIcon />} />}>
                                <Div>Tab 1 content.</Div>
                            </Tab>
                            <Tab label="Tab 2" icon={<TabIcon icon={<DoneIcon />} />}>
                                <Div>Tab 2 content.</Div>
                            </Tab>
                            <Tab label="Tab 3">
                                <Div>Tab 3 content - header without icon.</Div>
                            </Tab>
                            <Tab icon={<TabIcon icon={<DoneIcon />} />}>
                                <Div>Tab 4 content - header without label.</Div>
                            </Tab>
                            <Tab label="Tab 5" keepMounted>
                                <Div>
                                    Tab 5 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                            <Tab label="Tab 6" keepMounted>
                                <Div>
                                    Tab 6 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                            <Tab label="Tab 7" keepMounted>
                                <Div>
                                    Tab 7 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                        </Tabs>
                    </div>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <Tabs withScroll={withScroll}>
                            <Tab label="Tab 1" icon={<TabIcon src={deleteIcon} />}>
                                <Div>Tab 1 content.</Div>
                            </Tab>
                            <Tab label="Tab 2" icon={<TabIcon src={doneIcon} />}>
                                <Div>Tab 2 content.</Div>
                            </Tab>
                            <Tab label="Tab 3">
                                <Div>Tab 3 content - header without icon.</Div>
                            </Tab>
                            <Tab icon={<TabIcon src={doneIcon} />}>
                                <Div>Tab 4 content - header without label.</Div>
                            </Tab>
                            <Tab label="Tab 5" keepMounted>
                                <Div>
                                    Tab 5 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                            <Tab label="Tab 6" keepMounted>
                                <Div>
                                    Tab 6 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                            <Tab label="Tab 7" keepMounted>
                                <Div>
                                    Tab 7 content - header without icon. This tab will not be
                                    unmounted once it becomes inactive.
                                </Div>
                            </Tab>
                        </Tabs>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

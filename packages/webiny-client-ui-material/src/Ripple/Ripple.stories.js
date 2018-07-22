// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Ripple/README.md";
import { Icon } from "./../Icon";
import { withKnobs, boolean } from "@storybook/addon-knobs";

// $FlowFixMe
import { Ripple, PropsType } from "./Ripple";

const story = storiesOf("Components/Ripple", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const disabled = boolean("Disabled", false);

    const style = { padding: 20, width: 20, height: 20, display: "inline-block" };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"Icon with and without ripple"}>
                <Story.Sandbox.Example>
                    <div>
                        <div>No effect</div>
                        <div style={style}>
                            <Icon name="coffee" />
                        </div>

                        <div>
                            <code>unbounded</code>
                        </div>
                        <Ripple type="unbounded" disabled={disabled}>
                            <div style={style}>
                                <Icon name="edit" />
                            </div>
                        </Ripple>

                        <div>
                            <code>primary</code>
                        </div>
                        <Ripple type="primary" disabled={disabled}>
                            <div style={style}>
                                <Icon name="rocket" />
                            </div>
                        </Ripple>

                        <div>
                            <code>accent</code>
                        </div>
                        <Ripple type="accent" disabled={disabled}>
                            <div style={style}>
                                <Icon name="envelope" />
                            </div>
                        </Ripple>
                    </div>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    <div>
                        <div>
                            <Icon name="coffee" />
                        </div>

                        <Ripple type="unbounded" disabled={disabled}>
                            <div>
                                <Icon name="edit" />
                            </div>
                        </Ripple>

                        <Ripple type="primary" disabled={disabled}>
                            <div>
                                <Icon name="rocket" />
                            </div>
                        </Ripple>

                        <Ripple type="accent" disabled={disabled}>
                            <div>
                                <Icon name="envelope" />
                            </div>
                        </Ripple>
                    </div>
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import readme from "./README.md";

import { Form } from "webiny-form";

// $FlowFixMe
import Slider, { PropsType } from "./Slider";

const story = storiesOf("Components/Slider", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const disabled = boolean("Disabled", false);

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox>
                <Story.Sandbox.Example title={"Simple slider with a label and description"}>
                    <Form model={{ width: 200 }}>
                        {({ Bind }) => (
                            <Bind name="width">
                                <Slider
                                    label={"Number of rooms:"}
                                    disabled={disabled}
                                    description={"Choose the number of rooms in your apartment."}
                                    discrete
                                    displayMarkers
                                    min={1}
                                    max={10}
                                    step={1}
                                />
                            </Bind>
                        )}
                    </Form>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <Form model={{ width: 200 }}>
                        {({ Bind }) => (
                            <Bind name="width">
                                <Slider
                                    label={"Number of rooms:"}
                                    description={"Choose the number of rooms in your apartment."}
                                    discrete
                                    displayMarkers
                                    min={1}
                                    max={10}
                                    step={1}
                                />
                            </Bind>
                        )}
                    </Form>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

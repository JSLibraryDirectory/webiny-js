// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import readme from "./README.md";

import { Form } from "webiny-form";

// $FlowFixMe
import Select, { PropsType } from "./Select";

const story = storiesOf("Components/Select", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const disabled = boolean("Disabled", false);
    const box = boolean("Box", false);

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox>
                <Story.Sandbox.Example title={"Simple select with a label and description"}>
                    <Form>
                        {({ Bind }) => (
                            <Bind name="pet">
                                <Select
                                    label="Pets"
                                    disabled={disabled}
                                    box={box}
                                    description="Choose a pet of your liking."
                                >
                                    <Select.Option.Group label="Dogs">
                                        <Select.Option value="germanShepherd">
                                            German Shepherd
                                        </Select.Option>
                                        <Select.Option value="bulldog">Bulldog</Select.Option>
                                        <Select.Option value="sharPei">Shar-Pei</Select.Option>
                                    </Select.Option.Group>
                                    <Select.Option.Group label="Other">
                                        <Select.Option value="parrot">Parrot</Select.Option>
                                        <Select.Option value="cat">Cat</Select.Option>
                                        <Select.Option value="guinea ">Guinea Pig</Select.Option>
                                    </Select.Option.Group>
                                </Select>
                            </Bind>
                        )}
                    </Form>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <Form>
                        {({ Bind }) => (
                            <Bind name="pet">
                               <Select.Option.Group label="Dogs">
                                    <Select.Option value="germanShepherd">
                                        German Shepherd
                                    </Select.Option>
                                    <Select.Option value="bulldog">Bulldog</Select.Option>
                                    <Select.Option value="sharPei">Shar-Pei</Select.Option>
                                </Select.Option.Group>
                                <Select.Option.Group label="Other">
                                    <Select.Option value="parrot">Parrot</Select.Option>
                                    <Select.Option value="cat">Cat</Select.Option>
                                    <Select.Option value="guinea ">Guinea Pig</Select.Option>
                                </Select.Option.Group>
                            </Bind>
                        )}
                    </Form>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

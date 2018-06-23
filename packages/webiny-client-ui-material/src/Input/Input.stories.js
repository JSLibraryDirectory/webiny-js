import React from "react";
import { storiesOf } from "@storybook/react";
import { Grid, GridCell } from "rmwc/Grid";
import { Form } from "webiny-form";
import Input from "./index";

const story = storiesOf("Components/Input", module);

const bindProps = {
    name: "name",
    validators: ["required", "minLength:3"],
    validationMessages: { minLength: "Please enter more characters" }
};

story.add("label only", () => (
    <Form model={{ name: "" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input label={"Your name"} />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

story.add("placeholder only", () => (
    <Form model={{ name: "" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input placeholder={"Enter a name"} />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

story.add("with description", () => (
    <Form model={{ name: "" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input label={"Your name"} description={"This is your profile name"} />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

story.add("disabled", () => (
    <Form model={{ name: "" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input label={"Your name"} disabled />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

story.add("full width", () => (
    <Form model={{ name: "" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input
                            fullWidth
                            placeholder="Enter your name..."
                            description={"This is your profile name"}
                        />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

story.add("with icon", () => (
    <Form model={{ name: "0038567394023" }}>
        {({ Bind }) => (
            <Grid>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Input
                            leadingIcon={<Input.Icon icon={"phone-volume"} />}
                            label={"Your phone number"}
                            description={"Please enter a real number"}
                        />
                    </Bind>
                    <Bind {...bindProps}>
                        <Input
                            trailingIcon={<Input.Icon icon={"mobile-alt"} />}
                            label={"Your mobile number"}
                            description={"An SMS will be sent to this number"}
                        />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

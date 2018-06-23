import React from "react";
import { storiesOf } from "@storybook/react";
import { Grid, GridCell } from "rmwc/Grid";
import { Form } from "webiny-form";
import Textarea from "./index";

const story = storiesOf("Components/Textarea", module);

const bindProps = {
    name: "info",
    validators: ["required", "minLength:3"],
    validationMessages: { minLength: "Please enter more characters" }
};

story.add("textarea", () => (
    <Form>
        {({ Bind }) => (
            <Grid>
                <GridCell span={4}>
                    <Bind {...bindProps}>
                        <Textarea
                            disabled
                            rows={6}
                            placeholder="Disabled textarea"
                            description={"This is your profile info"}
                        />
                    </Bind>
                </GridCell>
                <GridCell span={12}>
                    <Bind {...bindProps}>
                        <Textarea
                            fullWidth
                            rows={4}
                            placeholder="Describe yourself..."
                            description={"This is your profile info"}
                        />
                    </Bind>
                </GridCell>
            </Grid>
        )}
    </Form>
));

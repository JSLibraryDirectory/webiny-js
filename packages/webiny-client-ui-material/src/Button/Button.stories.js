import React from "react";
import { storiesOf } from "@storybook/react";
import { Grid, GridCell } from "rmwc/Grid";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Story from "webiny-storybook-utils/lib/Story";
import readme from "./../Button/README.md";

import Button, { PropsType } from "./Button";

const story = storiesOf("Components/Button", module);
story.addDecorator(withKnobs);

story.add("all buttons", () => {
    const label = text("Label", "Click to proceed");
    const small = boolean("Small", false);
    const flat = boolean("Flat", false);
    const icon = <Button.Icon icon={text("Icon", "save")} />;

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox>
                <Grid>
                    <GridCell span="12">
                        <Button.Primary small={small} flat={flat}>
                            {label}
                        </Button.Primary>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Primary small={small} flat={flat}>
                            {icon}
                            {label}
                        </Button.Primary>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Secondary small={small}>{label}</Button.Secondary>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Secondary small={small}>
                            {icon}
                            {label}
                        </Button.Secondary>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Default small={small}>{label}</Button.Default>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Default small={small}>
                            {icon}
                            {label}
                        </Button.Default>
                    </GridCell>
                    <GridCell span="12">
                        <Button.Floating small={small}>{icon}</Button.Floating>
                    </GridCell>
                </Grid>
            </Story.Sandbox>
        </Story>
    );
});

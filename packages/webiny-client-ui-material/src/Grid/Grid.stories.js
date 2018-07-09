// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Grid/README.md";

// $FlowFixMe
import Grid, { PropsType } from "./Grid";

const story = storiesOf("Components/Grid", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props
                title={
                    <span>
                        <code>Grid.Cell</code> props
                    </span>
                }
            >
                {PropsType}
            </Story.Props>
            <Story.Sandbox title={"A simple grid."}>
                <Grid>
                    <Grid.Cell span={3} table={6} mobile={12}>
                        Apples
                    </Grid.Cell>
                    <Grid.Cell span={3} table={6} mobile={12}>
                        Oranges
                    </Grid.Cell>
                    <Grid.Cell span={3} table={6} mobile={12}>
                        Bananas
                    </Grid.Cell>
                    <Grid.Cell span={3} table={6} mobile={12}>
                        Bananas
                    </Grid.Cell>
                </Grid>
            </Story.Sandbox>
        </Story>
    );
});

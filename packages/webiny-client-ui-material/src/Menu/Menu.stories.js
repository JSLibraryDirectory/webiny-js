// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import Button from "./../Button";
import readme from "./../Menu/README.md";

// $FlowFixMe
import { Menu, MenuItem, PropsType } from "./Menu";

const story = storiesOf("Components/Menu", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"A simple menu, triggered with a button"}>
                <Menu handle={<Button.Primary>Open menu</Button.Primary>}>
                    <MenuItem
                        onClick={() => {
                            console.log("Apple selected!");
                        }}
                    >
                        Apple
                    </MenuItem>
                    <MenuItem>Banana</MenuItem>
                    <MenuItem>Watermelon</MenuItem>
                </Menu>
            </Story.Sandbox>
        </Story>
    );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./README.md";
import { ReactComponent as CloudIcon } from "./../assets/baseline-cloud_done-24px.svg";
import { ReactComponent as MoreIcon } from "./../assets/round-more_vert-24px.svg";
import { Menu, MenuItem } from "./../../Menu/index";

// $FlowFixMe
import { IconButton, PropsType } from "./IconButton";

const story = storiesOf("Components/Button", module);

story.add("icon button", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"Icon button"}>
                <IconButton
                    icon={<CloudIcon />}
                    label="Icon label"
                    onClick={() => console.log("Button clicked")}
                />
            </Story.Sandbox>
            <Story.Sandbox title={"Menu example"}>
                <Menu
                    handle={
                        <IconButton
                            icon={<MoreIcon />}
                            label="Toggle menu"
                            onClick={() => console.log("Button clicked")}
                        />
                    }
                >
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

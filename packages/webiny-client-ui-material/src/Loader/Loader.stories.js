// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Loader/README.md";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

// $FlowFixMe
import Loader, { PropsType } from "./Loader";

const story = storiesOf("Components/Loader", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const showLoader = boolean("Show loader", true);
    const wait = number("Wait", 50);

    const style = {
        position: "relative",
        border: "1px solid black",
        width: 500,
        height: 500
    };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"An area with applied loader"}>
                <div style={style}>
                    This is a content over which an overlay will be shown.
                    {showLoader && <Loader wait={wait} />}
                </div>
            </Story.Sandbox>
        </Story>
    );
});

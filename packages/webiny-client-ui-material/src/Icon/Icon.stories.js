// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Icon/README.md";

import autoRenew from "./svg/baseline-autorenew-24px.svg";
import cloudDone from "./svg/baseline-cloud_done-24px.svg";
import baselineDelete from "./svg/baseline-delete-24px.svg";
import baselineDone from "./svg/baseline-done-24px.svg";

// $FlowFixMe
import Icon, { PropsType } from "./Icon";

const story = storiesOf("Components/Icon", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"A simple icon"}>
                <div>
                    <Icon src={autoRenew} />&nbsp;
                    <Icon src={cloudDone} />&nbsp;
                    <Icon src={baselineDelete} />&nbsp;
                    <Icon src={baselineDone} />&nbsp;
                </div>
            </Story.Sandbox>
        </Story>
    );
});

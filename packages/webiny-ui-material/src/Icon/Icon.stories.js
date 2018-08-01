// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Icon/README.md";

import { ReactComponent as AutoRenewIcon } from "./svg/baseline-autorenew-24px.svg";
import { ReactComponent as CloudDoneIcon } from "./svg/baseline-cloud_done-24px.svg";
import { ReactComponent as BaselineDeleteIcon } from "./svg/baseline-delete-24px.svg";
import { ReactComponent as BaselineDoneIcon } from "./svg/baseline-done-24px.svg";

// $FlowFixMe
import { Icon, PropsType } from "./Icon";

const story = storiesOf("Components/Icon", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"A simple icon"}>
                <div>
                    <Icon icon={<AutoRenewIcon />} />&nbsp;
                    <Icon icon={<CloudDoneIcon />} />&nbsp;
                    <Icon icon={<BaselineDeleteIcon />} />&nbsp;
                    <Icon icon={<BaselineDoneIcon />} />&nbsp;
                </div>
            </Story.Sandbox>
        </Story>
    );
});

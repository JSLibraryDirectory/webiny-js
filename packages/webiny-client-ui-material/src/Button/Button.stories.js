// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Button/README.md";
import { ReactComponent as CloudIcon } from "./assets/baseline-cloud_done-24px.svg";

// $FlowFixMe
import {
    ButtonPrimary,
    ButtonSecondary,
    ButtonDefault,
    ButtonFloating,
    ButtonIcon,
    PropsType
} from "./Button";

const story = storiesOf("Components/Button", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const label = text("Label", "Click to proceed");
    const small = boolean("Small", false);
    const flat = boolean("Flat", false);
    const icon = <ButtonIcon icon={<CloudIcon />} />;

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"Primary button"}>
                <ButtonPrimary small={small} flat={flat}>
                    {label}
                </ButtonPrimary>
            </Story.Sandbox>
            <Story.Sandbox title={"Primary button with icon"}>
                <ButtonPrimary small={small} flat={flat}>
                    {icon}
                    {label}
                </ButtonPrimary>
            </Story.Sandbox>
            <Story.Sandbox title={"Secondary button"}>
                <ButtonSecondary small={small}>{label}</ButtonSecondary>
            </Story.Sandbox>
            <Story.Sandbox title={"Secondary button with icon"}>
                <ButtonSecondary small={small}>
                    {icon}
                    {label}
                </ButtonSecondary>
            </Story.Sandbox>
            <Story.Sandbox title={"Default button"}>
                <ButtonDefault small={small}>{label}</ButtonDefault>
            </Story.Sandbox>
            <Story.Sandbox title={"Default button with icon"}>
                <ButtonDefault small={small}>
                    {icon}
                    {label}
                </ButtonDefault>
            </Story.Sandbox>
            <Story.Sandbox title={"Floating button"}>
                <ButtonFloating small={small}>{icon}</ButtonFloating>
            </Story.Sandbox>
        </Story>
    );
});

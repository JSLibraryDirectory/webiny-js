// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../TopProgressBar/README.md";
import { ButtonPrimary } from "./../Button";
// $FlowFixMe
import { TopProgressBar, PropsType } from "./TopProgressBar";

const story = storiesOf("Components/TopProgressBar", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <Story.Sandbox.Example>
                    <TopProgressBar>
                        {({ start, done }) => (
                            <React.Fragment>
                                <ButtonPrimary onClick={start}>Start</ButtonPrimary>
                                &nbsp;
                                <ButtonPrimary onClick={done}>Done</ButtonPrimary>
                            </React.Fragment>
                        )}
                    </TopProgressBar>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <TopProgressBar>
                        {({start, done}) => (
                            <React.Fragment>
                                <ButtonPrimary onClick={start}>Start</ButtonPrimary>
                                <ButtonPrimary onClick={done}>Done</ButtonPrimary>
                            </React.Fragment>
                        )}
                    </TopProgressBar>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

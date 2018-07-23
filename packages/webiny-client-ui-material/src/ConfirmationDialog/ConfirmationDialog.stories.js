// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../ConfirmationDialog/README.md";
import { ButtonPrimary } from "./../Button";

// $FlowFixMe
import { ConfirmationDialog, PropsType } from "./ConfirmationDialog";

const story = storiesOf("Components/ConfirmationDialog", module);

story.add("usage", () => {
    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"Icon with and without ConfirmationDialog"}>
                <Story.Sandbox.Example>
                    <ConfirmationDialog
                        title="Pay Invoice"
                        message="Are you sure you want pay this invoice?"
                    >
                        {({ showConfirmation }) => {
                            return (
                                <ButtonPrimary
                                    onClick={() => {
                                        showConfirmation(
                                            () => console.log("Confirm"),
                                            () => console.log("Cancel")
                                        );
                                    }}
                                >
                                    Pay Invoice
                                </ButtonPrimary>
                            );
                        }}
                    </ConfirmationDialog>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                     <ConfirmationDialog
                        title="Pay Invoice"
                        message="Are you sure you want pay this invoice?"
                    >
                        {({ showConfirmation }) => {
                            return (
                                <ButtonPrimary
                                    onClick={() => {
                                        showConfirmation(
                                            () => console.log("Confirm"),
                                            () => console.log("Cancel")
                                        );
                                    }}
                                >
                                    Pay Invoice
                                </ButtonPrimary>
                            );
                        }}
                    </ConfirmationDialog>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

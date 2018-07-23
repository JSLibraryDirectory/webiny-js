// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Dialog/README.md";
import { withKnobs, boolean } from "@storybook/addon-knobs";

// $FlowFixMe
import Dialog, { PropsType } from "./Dialog";

const story = storiesOf("Components/Dialog", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const open = boolean("Open", false);

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"dialog"}>
                <Story.Sandbox.Example title={"A list with all possible options"}>
                    Toggle <code>open</code> prop via the bottom knobs.
                    <br />
                    <br />
                    Note that instead of using <code>Dialog.Footer.Button</code> with{" "}
                    <code>accept</code> or <code>cancel</code> prop, you can use a shorter{" "}
                    <code>Dialog.Accept</code> and <code>Dialog.Cancel</code> components
                    respectively.
                    <Dialog open={open}>
                        <Dialog.Header>
                            <Dialog.Header.Title>Delete confirmation</Dialog.Header.Title>
                        </Dialog.Header>
                        <Dialog.Body>Are you sure you want to delete?</Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.Cancel onClick={() => console.log("Cancel")}>
                                Cancel
                            </Dialog.Cancel>
                            <Dialog.Accept onClick={() => console.log("Accept")}>OK</Dialog.Accept>
                        </Dialog.Footer>
                    </Dialog>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <Dialog open={${open}}>
                        <Dialog.Header>
                            <Dialog.Header.Title>Delete confirmation</Dialog.Header.Title>
                        </Dialog.Header>
                        <Dialog.Body>Are you sure you want to delete?</Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.Cancel onClick={() => console.log("Cancel")}>Cancel</Dialog.Cancel>
                            <Dialog.Accept onClick={() => console.log("Accept")}>OK</Dialog.Accept>
                        </Dialog.Footer>
                    </Dialog>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import readme from "./../Snackbar/README.md";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { ButtonPrimary } from "./../Button";

// $FlowFixMe
import { Snackbar, PropsType } from "./Snackbar";

const story = storiesOf("Components/Snackbar", module);
story.addDecorator(withKnobs);

class SnackbarContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <Snackbar
                    show={this.state.show}
                    onHide={() => this.setState({ show: false })}
                    message="This is a message."
                    alignStart={this.props.alignStart}
                    actionText="Something"
                    actionHandler={() => console.log("Action triggered.")}
                />
                <ButtonPrimary onClick={() => this.setState({ show: true })}>
                    Show message
                </ButtonPrimary>
            </React.Fragment>
        );
    }
}

story.add("usage", () => {
    const alignStart = boolean("alignStart", false);

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox>
                <Story.Sandbox.Example>
                    <SnackbarContainer alignStart={alignStart} />
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                        <div>
                             <Snackbar
                                show={this.state.show}
                                alignStart={${alignStart}}
                                onHide={() => this.setState({ show: false })}
                                message="This is a message."
                            />
                            <ButtonPrimary onClick={() => this.setState({ show: true })}>
                                Show message
                            </ButtonPrimary>
                        </div>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

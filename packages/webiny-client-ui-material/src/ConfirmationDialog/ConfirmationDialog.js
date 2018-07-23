// @flow
import * as React from "react";
import Dialog from "webiny-client-ui-material/Dialog";

type Props = {
    // Title of confirmation dialog.
    title?: React.Node,

    // Message of confirmation dialog.
    message?: React.Node,

    // An element that will trigger the confirmation dialog.
    children?: ({
        showConfirmation: (onAccept: Function, onCancel: Function) => any
    }) => React.Node
};

type State = {
    show: boolean
};

/**
 * Use ConfirmationDialog component to display a list of choices, once the handler is triggered.
 */
class ConfirmationDialog extends React.Component<Props, State> {
    callbacks: {};

    state = {
        show: false
    };

    defaultProps = {
        title: null,
        message: null
    };

    showConfirmation = (onAccept, onCancel) => {
        this.callbacks = { onAccept, onCancel };
        this.setState({ show: true });
    };

    render() {
        return (
            <React.Fragment>
                <Dialog open={this.state.show}>
                    <Dialog.Header>
                        <Dialog.Header.Title>{this.props.title}</Dialog.Header.Title>
                    </Dialog.Header>
                    <Dialog.Body>{this.props.message}</Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.Accept
                            onClick={() => {
                                const { onAccept } = this.callbacks;
                                if (typeof onAccept === "function") {
                                    onAccept();
                                }
                            }}
                        >
                            Confirm
                        </Dialog.Accept>
                        <Dialog.Cancel
                            onClick={() => {
                                const { onCancel } = this.callbacks;
                                if (typeof onCancel === "function") {
                                    onCancel();
                                }
                            }}
                        >
                            Cancel
                        </Dialog.Cancel>
                    </Dialog.Footer>
                </Dialog>
                {this.props.children({
                    showConfirmation: this.showConfirmation
                })}
            </React.Fragment>
        );
    }
}

export { ConfirmationDialog };

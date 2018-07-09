// @flow
import * as React from "react";
import {
    Dialog as RmwcDialog,
    DialogSurface,
    DialogHeader,
    DialogHeaderTitle,
    DialogBody,
    DialogFooter,
    DialogFooterButton,
    DialogBackdrop
} from "rmwc/Dialog";

type Props = {
    children: any,

    // If true, dialog will be permanently fixed inside of a view (works for temporary and persistent modes).
    open?: boolean
};

/**
 * Use Dialog component to display an informative or alert message and allow users to act upon it.
 * @param props
 * @returns {*}
 * @constructor
 */
const Dialog = (props: Props) => {
    // Let's pass "permanent" / "persistent" / "temporary" flags as "mode" prop instead.
    return (
        <RmwcDialog {...props}>
            <DialogSurface>{props.children}</DialogSurface>
            <DialogBackdrop />
        </RmwcDialog>
    );
};

/**
 * Dialog's header, which can accept Dialog.Header.Title component or any other set of components.
 * @param props
 * @returns {*}
 * @constructor
 */
const Header = props => <DialogHeader {...props} />;

/**
 * A simple component for showing dialog's title.
 * @param props
 * @returns {*}
 * @constructor
 */
const HeaderTitle = props => <DialogHeaderTitle {...props} />;

/**
 * Can be used to show accept and cancel buttons.
 * @param props
 * @returns {*}
 * @constructor
 */
const Footer = props => <DialogFooter {...props} />;

/**
 * Use this to show a simple button.
 * @param props
 * @returns {*}
 * @constructor
 */
const FooterButton = props => <DialogFooterButton {...props} />;

/**
 * Use this to close the dialog without taking any additional action.
 * @param props
 * @returns {*}
 * @constructor
 */
const DialogCancel = props => {
    return (
        <Dialog.Footer.Button {...props} cancel>
            {props.children}
        </Dialog.Footer.Button>
    );
};

/**
 * Use this to close the dialog without taking any additional action.
 * @param props
 * @returns {*}
 * @constructor
 */
const DialogAccept = props => {
    return (
        <Dialog.Footer.Button {...props} accept>
            {props.children}
        </Dialog.Footer.Button>
    );
};

Dialog.Header = Header;
Dialog.Header.Title = HeaderTitle;
Dialog.Body = DialogBody;
Dialog.Footer = Footer;
Dialog.Footer.Button = FooterButton;

Dialog.Accept = DialogAccept;
Dialog.Cancel = DialogCancel;

export default Dialog;

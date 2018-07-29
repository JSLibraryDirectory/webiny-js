// @flow
import * as React from "react";
import * as R from "rmwc/Button";
import { Fab } from "rmwc/Fab";
import { Icon } from "../Icon/Icon";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Make button flat (only applicable to Primary button).
    flat?: boolean,

    // Make button smaller.
    small?: boolean,

    // onClick handler.
    onClick?: Function,

    // Label and optionally an icon (using Button.Icon component).
    children: React.Node
};

/**
 * Shows a default button, used typically when action is not of high priority.
 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonDefault = (props: Props) => {
    const { onClick, children, small } = props;
    return (
        <R.Button dense={small} onClick={onClick}>
            {children}
        </R.Button>
    );
};

/**
 * Shows primary button, eg. for submitting forms.
 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonPrimary = (props: Props) => {
    const { onClick, children, small = false, flat = false } = props;
    return (
        <R.Button raised={!flat} dense={small} unelevated={flat} onClick={onClick}>
            {children}
        </R.Button>
    );
};

/**
 * Shows a secondary button - eg. for doing a reset on a form.
 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonSecondary = (props: Props) => {
    const { onClick, children, small = false } = props;

    return (
        <R.Button outlined dense={small} onClick={onClick}>
            {children}
        </R.Button>
    );
};

/**
 * A floating button, shown on the side of the screen, typically used for creating new content or accessing settings.
 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonFloating = (props: Props) => {
    const { onClick, children, small = false } = props;
    return (
        <Fab mini={small} onClick={onClick}>
            {children}
        </Fab>
    );
};

/**
 * Shows an icon, suitable to be shown inside of a button.
 * @param props
 * @returns {*}
 * @constructor
 */
const ButtonIcon = (props: any) => <Icon {...props} />;

export { ButtonDefault, ButtonPrimary, ButtonSecondary, ButtonFloating, ButtonIcon };

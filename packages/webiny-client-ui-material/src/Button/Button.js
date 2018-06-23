// @flow
import * as React from "react";
import * as R from "rmwc/Button";
import { Fab } from "rmwc/Fab";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

type Props = {
    /* Make button flat (only applicable to Primary button) */
    flat?: boolean,
    /* Make button smaller */
    small?: boolean,
    /* Label and optionally an icon (via Button.Icon component) */
    children: React.Node
};

const Default = (props: Props) => {
    const { children, small } = props;
    return <R.Button dense={small}>{children}</R.Button>;
};

Default.displayName = "Button.Default";

const Primary = (props: Props) => {
    const { children, small = false, flat = false } = props;
    return (
        <R.Button raised={!flat} dense={small} unelevated={flat}>
            {children}
        </R.Button>
    );
};

Primary.displayName = "Button.Primary";

const Secondary = (props: Props) => {
    const { children, small = false } = props;

    return (
        <R.Button outlined dense={small}>
            {children}
        </R.Button>
    );
};

Secondary.displayName = "Button.Secondary";

const Floating = (props: Props) => {
    const { children, small = false } = props;
    return <Fab mini={small}>{children}</Fab>;
};

Floating.displayName = "Button.Floating";

const Icon = (props: any) => <FontAwesomeIcon {...props} className={"mdc-button__icon"} />;

Icon.displayName = "Button.Icon";

export default {
    Default,
    Primary,
    Secondary,
    Floating,
    Icon
};

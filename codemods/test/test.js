// @flow
import * as React from "react";
import * as R from "rmwc/Button";

type Props = {
    small?: boolean,
    onClick: (value: mixed) => void,
    config: {
        limit: number,
        slots: Array<string>
    },
    children: React.Node
};

const Default = (props: Props) => {
    const { children, small } = props;
    return <R.Button dense={small}>{children}</R.Button>;
};

Default.displayName = "Button.Default";

export default Default;

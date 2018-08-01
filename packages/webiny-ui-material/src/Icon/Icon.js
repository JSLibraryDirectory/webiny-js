// @flow
import * as React from "react";
import { css } from "emotion";

type Props = {
    // SvgComponent containing the svg icon
    icon: React.Node,

    // Optional onclick handler
    onClick?: Function
};

const webinyIcon = css(
    {},
    {
        "&.mdc-button__icon": {
            marginLeft: 0,
            width: "inherit",
            display: "block"
        }
    }
);

/**
 * Use Icon component to display an icon.
 * @param props
 * @returns {*}
 * @constructor
 */
const Icon = (props: Props) => {
    return React.cloneElement(props.icon, {
        className: "mdc-button__icon " + webinyIcon,
        onClick: props.onClick
    });
};

export { Icon };

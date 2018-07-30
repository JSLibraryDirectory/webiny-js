// @flow
import * as React from "react";
import { css } from "emotion";

type Props = {
    src: string
};

const webinyIcon = css(
    {},
    {
        "&.mdc-button__icon": {
            marginLeft: 0,
            width: "inherit"
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
        ...props,
        className: "mdc-button__icon " + webinyIcon
    });
};

export { Icon };

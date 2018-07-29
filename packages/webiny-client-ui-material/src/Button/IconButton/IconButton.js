// @flow
import * as React from "react";
import { IconButton as RIconButton } from "rmwc/IconButton";
import { Icon } from "../../Icon/Icon";

import type { FormComponentProps } from "../../types";

type Props = FormComponentProps & {
    // Icon you wish to have. Icon should be provided as an SvgComponent
    icon: React.Node,

    // Button label.
    label: string,

    // onClick handler.
    onClick?: Function
};

/**
 * Shows the icon button.
 * @param props
 * @returns {*}
 * @constructor
 */
const IconButton = (props: Props) => {
    const { icon, label, onClick } = props;
    return <RIconButton onClick={onClick} offLabel={label} offContent={<Icon icon={icon} />} />;
};

export { IconButton };

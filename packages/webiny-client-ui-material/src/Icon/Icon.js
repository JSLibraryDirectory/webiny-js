// @flow
import * as React from "react";
import { Icon as RmwcIcon } from "rmwc/Icon";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";

type Props = {
    name: string
};

/**
 * Use Icon component to display an icon.
 * @param props
 * @returns {*}
 * @constructor
 */
const Icon = (props: Props) => {
    return (
        <RmwcIcon
            strategy="custom"
            render={() => <FontAwesomeIcon {...props} icon={props.name} />}
        />
    );
};

export default Icon;

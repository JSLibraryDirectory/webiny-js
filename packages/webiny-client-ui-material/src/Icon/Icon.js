// @flow
import * as React from "react";
import { Icon as RmwcIcon } from "rmwc/Icon";

type Props = {
    src: string
};

/**
 * Use Icon component to display an icon.
 * @param props
 * @returns {*}
 * @constructor
 */
const Icon = (props: Props) => {
    return <RmwcIcon strategy="custom" render={() => <img {...props} />} />;
};

export { Icon };

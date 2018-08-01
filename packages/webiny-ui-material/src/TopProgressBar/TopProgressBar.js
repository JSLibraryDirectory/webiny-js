// @flow
import * as React from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

type Props = {
    // Elements that require top loading bar to be shown.
    children?: ({ start: Function, done: Function }) => React.Node
};

/**
 * Use `TopProgressBar` to let users know their actions are being processed.
 */
const TopProgressBar = (props: Props) => {
    return props.children({
        start: nprogress.start,
        finish: nprogress.done
    });
};

export { TopProgressBar };

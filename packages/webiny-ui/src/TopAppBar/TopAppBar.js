// @flow
import * as React from "react";

import {
    TopAppBar as RmwcTopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarTitle,
    TopAppBarActionItem
} from "rmwc/TopAppBar";

type Props = {};

/**
 * Use TopAppBar component to display navigation for the whole app or just a small section of it.
 * @param props
 * @returns {*}
 * @constructor
 */
const TopAppBar = (props: Props) => {
    return (
        <RmwcTopAppBar>
            <TopAppBarRow>{props.children}</TopAppBarRow>
        </RmwcTopAppBar>
    );
};

export {
    TopAppBar,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarTitle,
    TopAppBarActionItem
};

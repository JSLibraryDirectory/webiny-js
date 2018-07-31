// @flow
import * as React from "react";
import {
    Drawer as RmwcDrawer,
    DrawerContent as RmwcDrawerContent,
    DrawerHeader as RmwcDrawerHeader
} from "rmwc/Drawer";

type Props = {
    // DrawerHeader and DrawerContent components (both can receive any React.Node as children).
    children: React.ChildrenArray<
        React.Element<typeof DrawerHeader> | React.Element<typeof DrawerContent>
    >,

    // If true, drawer will be permanently fixed inside of a view (works for temporary and persistent modes).
    open?: boolean,

    // Choose display mode:
    // "permanent" (default) - drawer will be permanently fixed inside of a view.
    // "temporary" - drawer will be displayed fixed on the side of the entire viewport.
    // "persistent" - similar to permanent, except its visibility can be toggled (while closed, it still takes up viewable space).
    mode?: "permanent" | "persistent" | "temporary"
};

/**
 * Use Drawer component to display navigation for the whole app or just a small section of it.
 * @param props
 * @returns {*}
 * @constructor
 */
const Drawer = (props: Props) => {
    // Let's pass "permanent" / "persistent" / "temporary" flags as "mode" prop instead.
    const mode = props.mode || "permanent";
    return <RmwcDrawer {...{ [mode]: true }} {...props} />;
};

/**
 * Shows header of the drawer.
 * @param props
 * @returns {*}
 * @constructor
 */
const DrawerHeader = props => <RmwcDrawerHeader {...props} />;

/**
 * Shows drawer content. It can be anything, but commonly a List component would suffice here.
 * @param props
 * @returns {*}
 * @constructor
 */
const DrawerContent = props => <RmwcDrawerContent {...props} />;

export { Drawer, DrawerHeader, DrawerContent };

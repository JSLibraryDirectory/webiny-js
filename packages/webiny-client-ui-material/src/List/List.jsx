// @flow
import * as React from "react";
import { List as RmwcList, ListItem as RmwcListItem } from "rmwc/List";

type Props = {
    // One or more ListItem components, which can then consist of the following components:
    // - ListItemText
    // - ListItemTextSecondary
    // - ListItemText.Graphic
    // - ListItemText.Meta
    children: React.ChildrenArray<React.Element<typeof ListItem>>,

    // Should we add the ripple effect to the list item. Default: true
    ripple?: boolean
};

/**
 * Use List component to display data and offer additional actions if needed.
 * @param props
 * @returns {*}
 * @constructor
 */
const List = (props: Props) => {
    return <RmwcList>{props.children}</RmwcList>;
};

/**
 * ListItem components are placed as direct children to List component.
 * @param props
 * @returns {*}
 * @constructor
 */
const ListItem = (props: {
    children: React.ChildrenArray<
        | React.Element<typeof ListItemText>
        | React.Element<typeof ListItemGraphic>
        | React.Element<typeof ListItemMeta>
    >
}) => {
    return <RmwcListItem {...props} />;
};

/**
 * Used to show regular text in list items.
 * @param props
 * @returns {*}
 * @constructor
 */
const ListItemText = (props: { children: React.Node }) => {
    return <span className="mdc-list-item__text">{props.children}</span>;
};

/**
 * Used to show secondary text in list items.
 * @param props
 * @returns {*}
 * @constructor
 */
const ListItemTextSecondary = (props: { children: React.Node }) => {
    return <span className="mdc-list-item__secondary-text">{props.children}</span>;
};

/**
 * Can be used to show an icon or any other custom element. Rendered on the left side.
 * @param props
 * @returns {*}
 * @constructor
 */
const ListItemGraphic = (props: { children: React.Node, className?: string }) => {
    return <div className={"mdc-list-item__graphic " + props.className}>{props.children}</div>;
};

/**
 * Can be used to show an icon or any other custom element. Rendered on the right side.
 * @param props
 * @returns {*}
 * @constructor
 */
const ListItemMeta = (props: { children: React.Node, className?: string }) => {
    return <span className={"mdc-list-item__meta " + props.className}>{props.children}</span>;
};

export { List, ListItem, ListItemText, ListItemTextSecondary, ListItemGraphic, ListItemMeta };

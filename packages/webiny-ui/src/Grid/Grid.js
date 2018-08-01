// @flow
import * as React from "react";
import { Grid as RmwcGrid, GridCell as RmwcGridCell } from "rmwc/Grid";

type GridProps = {
    // One or more Cell components.
    children: React.ChildrenArray<React.Element<typeof Cell>>
};

type Props = {
    // One or more Cell components.
    children?: React.Node,

    // Default number of columns to span.
    span?: string | number,

    // Number of columns to span on a phone.
    phone?: string | number,

    // Number of columns to span on a tablet.
    tablet?: string | number,

    // Number of columns to span on a desktop.
    desktop?: string | number,

    // Specifies the order of the cell.
    order?: string | number,

    // Specifies the alignment of cell
    align?: "top" | "middle" | "bottom"
};

/**
 * Use Grid component to display a list of choices, once the handler is triggered.
 */
const Grid = (props: GridProps) => {
    return <RmwcGrid {...props}>{props.children}</RmwcGrid>;
};

/**
 * Cell must be direct children of Grid component.
 * @param props
 * @returns {*}
 * @constructor
 */
const Cell = (props: Props) => {
    return <RmwcGridCell {...props}>{props.children}</RmwcGridCell>;
};

export { Grid, Cell };

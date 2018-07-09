// @flow
import * as React from "react";
import { Grid as RmwcGrid, GridCell as RmwcGridCell } from "rmwc/Grid";

type GridProps = {
    // One or more Grid.Cell components.
    children: React.ChildrenArray<React.Element<typeof Grid.Cell>>
};

type Props = {
    // One or more Grid.Cell components.
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
    return <RmwcGrid>{props.children}</RmwcGrid>;
};

/**
 * Grid.Cell must be direct children of Grid component.
 * @param props
 * @returns {*}
 * @constructor
 */
Grid.Cell = function GridCell(props: Props) {
    return <RmwcGridCell {...props}>{props.children}</RmwcGridCell>;
};

Grid.Cell.displayName = "Grid.Cell";

export default Grid;

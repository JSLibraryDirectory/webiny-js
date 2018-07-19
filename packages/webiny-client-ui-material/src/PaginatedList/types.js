// @flow
import * as React from "react";

export type PaginationProp = {
    from?: number,
    to?: number,
    totalCount?: number,
    totalPages?: number,
    nextPage?: number,
    previousPage?: number,
    setPage?: Function,
    setPerPage?: Function,
    perPageOptions?: Array<number>
};

export type SortersProp = {
    list?: { [string]: string },
    setSorter?: Function
};

export type Props = {
    // Pass a function to take full control of list render.
    children: ?Function,

    // A title of paginated list.
    title: ?React.Node,

    // Data that needs to be shown in the list.
    data: ?Array<Object>,

    // A callback that must refresh current view by repeating the previous query.
    refresh: ?Function,

    // If true, Loader component will be shown, disallowing any interaction.
    loading: ?boolean,

    // Provide all pagination data, options and callbacks here.
    pagination: ?PaginationProp,

    // Provide all sorters options and callbacks here.
    sorters: ?SortersProp,

    multiActions: ?Array<any> // TODO: define
};
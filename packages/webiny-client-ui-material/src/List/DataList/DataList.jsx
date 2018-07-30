// @flow
import * as React from "react";
import styled from "react-emotion";
import classNames from "classnames";
import Loader from "./Loader";

import Checkbox from "webiny-client-ui-material/Checkbox";
import { Menu, MenuItem } from "webiny-client-ui-material/Menu";
import { Grid, Cell } from "webiny-client-ui-material/Grid";

import { RefreshIcon, SortIcon, PreviousPageIcon, NextPageIcon, OptionsIcon } from "./icons";

import type { MetaProp, SortersProp } from "./types";

const ListContainer = styled("div")({
    position: "relative"
});

const ListHeader = styled("div")({
    borderBottom: "1px solid lightgray"
});

ListHeader.Item = styled("div")({
    display: "inline-block",
    verticalAlign: "middle",
    "&.disabled": {
        opacity: 0.5,
        pointerEvents: "none"
    }
});

ListHeader.Icon = styled("div")({
    display: "inline-block",
    height: 18,
    width: 18,
    padding: 11,
    color: "rgba(0, 0, 0, 0.54)",
    textAlign: "center"
});

// This was copied from "./types" so that it can be outputted in docs.
type Props = {
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

    // Provide a custom loader. Shown while the content is loading.
    loader: ?React.Node,

    // Provide all pagination data, options and callbacks here.
    meta: ?MetaProp,

    // Triggered once the page has been selected.
    setPage: ?Function,

    // Triggered once a sorter has been selected.
    setSorters: ?Function,

    // Triggered once selected filters are submitted.
    setFilters: ?Function,

    // Triggered when number of entries per page has been changed.
    setPerPage: ?Function,

    // By default, users can choose from 10, 25 or 50 entries per page.
    perPageOptions: Array<number>,

    // Provide all sorters options and callbacks here.
    sorters: ?SortersProp,

    actions?: React.Node,

    multiActions: ?Array<any> // TODO: define
};

const MultiActions = (props: Props) => {
    const multiActions = props.multiActions;
    if (!multiActions) {
        return null;
    }

    return (
        <ListHeader.Item>
            <Checkbox />
        </ListHeader.Item>
    );
};

const RefreshButton = (props: Props) => {
    const refresh = props.refresh;
    if (!refresh) {
        return null;
    }

    return (
        <ListHeader.Item>
            <ListHeader.Icon>
                <RefreshIcon onClick={refresh} />
            </ListHeader.Icon>
        </ListHeader.Item>
    );
};

const Sorters = (props: Props) => {
    const sorters = props.sorters;
    if (!sorters) {
        return null;
    }

    return (
        <ListHeader.Item>
            <Menu
                handle={
                    <ListHeader.Icon>
                        <SortIcon />
                    </ListHeader.Icon>
                }
            >
                {sorters.map(sorter => (
                    <MenuItem
                        key={sorter.label}
                        onClick={() => {
                            if (sorters && props.setSorters) {
                                props.setSorters(sorter.sorters);
                            }
                        }}
                    >
                        {sorter.label}
                    </MenuItem>
                ))}
            </Menu>
        </ListHeader.Item>
    );
};

const Pagination = (props: Props) => {
    const meta = props.meta;
    if (!meta) {
        return null;
    }

    return (
        <React.Fragment>
            {meta.from &&
                meta.to &&
                meta.totalCount && (
                    <ListHeader.Item>
                        {meta.from} - {meta.to} of {meta.totalCount}
                    </ListHeader.Item>
                )}

            {props.setPage && (
                <React.Fragment>
                    <ListHeader.Item
                        className={classNames({
                            disabled: !meta.previousPage
                        })}
                    >
                        <ListHeader.Icon>
                            <PreviousPageIcon
                                onClick={() => {
                                    if (props.setPage && meta.previousPage) {
                                        props.setPage(meta.previousPage);
                                    }
                                }}
                            />
                        </ListHeader.Icon>
                    </ListHeader.Item>

                    <ListHeader.Item
                        className={classNames({
                            disabled: !meta.nextPage
                        })}
                    >
                            <ListHeader.Icon>
                                <NextPageIcon
                                    onClick={() => {
                                        if (props.setPage && meta.nextPage) {
                                            props.setPage(meta.nextPage);
                                        }
                                    }}
                                />
                            </ListHeader.Icon>
                    </ListHeader.Item>
                </React.Fragment>
            )}

            {props.setPerPage && (
                <ListHeader.Item>
                    <Menu
                        handle={
                                <ListHeader.Icon>
                                    <OptionsIcon />
                                </ListHeader.Icon>
                        }
                    >
                        {props.setPerPage &&
                            props.perPageOptions.map(perPage => (
                                <MenuItem
                                    key={perPage}
                                    onClick={() => props.setPerPage && props.setPerPage(perPage)}
                                >
                                    {perPage}
                                </MenuItem>
                            ))}
                    </Menu>
                </ListHeader.Item>
            )}
        </React.Fragment>
    );
};

const DataList = (props: Props) => {
    return (
        <ListContainer>
            <ListHeader>
                <Grid>
                    <Cell span="6">{props.title}</Cell>
                    <Cell span="6" style={{ textAlign: "right" }}>
                        {props.actions}
                    </Cell>
                </Grid>
            </ListHeader>

            <ListHeader>
                <Grid>
                    <Cell span="6">
                        <MultiActions {...props} />
                        <RefreshButton {...props} />
                        <Sorters {...props} />
                    </Cell>

                    <Cell span="6" style={{ textAlign: "right" }}>
                        <Pagination {...props} />
                    </Cell>
                </Grid>
            </ListHeader>
            {props.loading ? props.loader || <Loader /> : props.children && props.children(props)}
        </ListContainer>
    );
};

DataList.defaultProps = {
    children: null,
    title: null,
    data: null,
    meta: null,
    loading: false,
    refresh: null,
    setPage: null,
    setPerPage: null,
    perPageOptions: [10, 25, 50],
    sorters: null,
    actions: null,

    multiActions: null,
    loader: null
};

export { DataList };

// @flow
import * as React from "react";
import _ from "lodash";
import styled from "react-emotion";
import classNames from "classnames";

import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Checkbox from "webiny-client-ui-material/Checkbox";
import Menu from "webiny-client-ui-material/Menu";
import Ripple from "webiny-client-ui-material/Ripple";
import Grid from "webiny-client-ui-material/Grid";
import Loader from "webiny-client-ui-material/Loader";
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

List.Icon = styled("div")({
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

    // Provide all pagination data, options and callbacks here.
    meta: ?MetaProp,

    // Triggered once the page has been selected.
    setPage: ?Function,

    // Triggered when number of entries per page has been changed.
    setPerPage: ?Function,

    // By default, users can choose from 10, 25 or 50 entries per page.
    perPageOptions: Array<number>,

    // Provide all sorters options and callbacks here.
    sorters: ?SortersProp,

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
            <Ripple unbounded>
                <List.Icon>
                    <Icon onClick={refresh} name={"sync-alt"} />
                </List.Icon>
            </Ripple>
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
                    <Ripple unbounded>
                        <List.Icon>
                            <Icon name={"sort-alpha-up"} />
                        </List.Icon>
                    </Ripple>
                }
            >
                {_.map(sorters.list, (label, value) => (
                    <Menu.Item
                        key={value}
                        onClick={() => {
                            if (sorters && sorters.setSorter) {
                                sorters.setSorter(value);
                            }
                        }}
                    >
                        {label}
                    </Menu.Item>
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
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon
                                    name={"angle-left"}
                                    onClick={() => {
                                        if (props.setPage && meta.previousPage) {
                                            props.setPage(meta.previousPage);
                                        }
                                    }}
                                />
                            </List.Icon>
                        </Ripple>
                    </ListHeader.Item>

                    <ListHeader.Item
                        className={classNames({
                            disabled: !meta.nextPage
                        })}
                    >
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon
                                    name={"angle-right"}
                                    onClick={() => {
                                        if (props.setPage && meta.nextPage) {
                                            props.setPage(meta.nextPage);
                                        }
                                    }}
                                />
                            </List.Icon>
                        </Ripple>
                    </ListHeader.Item>
                </React.Fragment>
            )}

            {props.setPerPage && (
                <ListHeader.Item>
                    <Menu
                        handle={
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"columns"} />
                                </List.Icon>
                            </Ripple>
                        }
                    >
                        {props.setPerPage &&
                            props.perPageOptions.map(perPage => (
                                <Menu.Item
                                    key={perPage}
                                    onClick={() => props.setPerPage && props.setPerPage(perPage)}
                                >
                                    {perPage}
                                </Menu.Item>
                            ))}
                    </Menu>
                </ListHeader.Item>
            )}
        </React.Fragment>
    );
};

const PaginatedList = (props: Props) => {
    return (
        <ListContainer>
            {props.loading && <Loader />}
            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">{props.title}</Grid.Cell>
                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        {/* TODO: top actions here. */}
                    </Grid.Cell>
                </Grid>
            </ListHeader>

            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">
                        <MultiActions {...props} />
                        <RefreshButton {...props} />
                        <Sorters {...props} />
                    </Grid.Cell>

                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        <Pagination {...props} />
                    </Grid.Cell>
                </Grid>
            </ListHeader>
            {props.children && props.children(props)}
        </ListContainer>
    );
};

PaginatedList.defaultProps = {
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
    multiActions: null
};

export default PaginatedList;

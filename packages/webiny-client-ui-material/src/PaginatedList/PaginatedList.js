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

type PaginationProp = {
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

type SortersProp = {
    list?: { [string]: string },
    setSorter?: Function
};

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
    pagination: ?PaginationProp,

    sorters: ?SortersProp,

    multiActions: ?Array<any> // TODO: define
};

const MultiActions = (props: Props) => {
    if (props.multiActions) {
        return (
            <ListHeader.Item>
                <Checkbox />
            </ListHeader.Item>
        );
    }

    return null;
};

const RefreshButton = (props: Props) => {
    if (props.refresh) {
        return (
            <ListHeader.Item>
                <Ripple unbounded>
                    <List.Icon>
                        <Icon onClick={props.refresh} name={"sync-alt"} />
                    </List.Icon>
                </Ripple>
            </ListHeader.Item>
        );
    }

    return null;
};

const Sorters = (props: Props) => {
    if (!props.sorters) {
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
                {_.map(props.sorters.list, (label, value) => (
                    <Menu.Item
                        key={value}
                        onClick={() => {
                            if (props.sorters && props.sorters.setSorter) {
                                props.sorters.setSorter(value);
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
    const pagination = props.pagination;
    if (!pagination) {
        return null;
    }

    return (
        <React.Fragment>
            {pagination.from &&
                pagination.to &&
                pagination.totalCount && (
                    <ListHeader.Item>
                        {pagination.from} - {pagination.to} of {pagination.totalCount}
                    </ListHeader.Item>
                )}

            {pagination.setPage && (
                <React.Fragment>
                    <ListHeader.Item
                        className={classNames({
                            disabled: !pagination.previousPage
                        })}
                    >
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon
                                    name={"angle-left"}
                                    onClick={() => {
                                        if (pagination.setPage && pagination.previousPage) {
                                            pagination.setPage(pagination.previousPage);
                                        }
                                    }}
                                />
                            </List.Icon>
                        </Ripple>
                    </ListHeader.Item>

                    <ListHeader.Item
                        className={classNames({
                            disabled: !pagination.nextPage
                        })}
                    >
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon
                                    name={"angle-right"}
                                    onClick={() => {
                                        if (pagination.setPage && pagination.nextPage) {
                                            pagination.setPage(pagination.nextPage);
                                        }
                                    }}
                                />
                            </List.Icon>
                        </Ripple>
                    </ListHeader.Item>
                </React.Fragment>
            )}

            {pagination.setPerPage && (
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
                        {pagination.setPerPage &&
                            pagination.perPageOptions &&
                            pagination.perPageOptions.map(perPage => (
                                <Menu.Item
                                    key={perPage}
                                    onClick={() =>
                                        pagination.setPerPage && pagination.setPerPage(perPage)
                                    }
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
    refresh: null,
    loading: false,
    pagination: null,

    multiActions: null,
    sorters: null,
    setPerPage: null,
    perPageOptions: [5, 10, 25, 50]
};

export default PaginatedList;

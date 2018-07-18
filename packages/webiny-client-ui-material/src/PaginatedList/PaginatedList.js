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

import { i18n } from "webiny-client";
const t = i18n.namespace("Security.UsersList");

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
    next?: Function,
    previous?: Function,
    hasNext?: boolean,
    hasPrevious?: boolean
};

type DataProp = {
    list?: Array<Object>,
    meta?: {
        count: number,
        totalCount: number,
        totalPages: number,
        page: number,
        perPage: number,
        from: number,
        to: number
    }
};

type Props = {
    title: ?React.Node,
    data: ?DataProp,

    refresh: ?Function,
    children: ?Function,
    loading: ?boolean,
    sorters: ?Array<any>, // TODO: define
    pagination: ?PaginationProp,
    setPerPage: ?Function,

    multiActions: ?Array<any>, // TODO: define
    perPageOptions: ?Array<number>,
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
    if (props.sorters) {
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
                    {_.map(props.sorters, (label, value) => (
                        <Menu.Item
                            key={value}
                            onClick={function onClick() {
                                console.log(value);
                            }}
                        >
                            {label}
                        </Menu.Item>
                    ))}
                </Menu>
            </ListHeader.Item>
        );
    }

    return null;
};

const Pagination = (props: Props) => {
    const pagination = props.pagination;

    if (!pagination) {
        return null;
    }

    return (
        <React.Fragment>
            <ListHeader.Item>{t`{from} - {to} of {totalCount}`(pagination)}</ListHeader.Item>

            <ListHeader.Item
                className={classNames({
                    disabled: props.pagination && !props.pagination.hasPrevious
                })}
            >
                <Ripple unbounded>
                    <List.Icon>
                        <Icon
                            name={"angle-left"}
                            onClick={props.pagination && props.pagination.previous}
                        />
                    </List.Icon>
                </Ripple>
            </ListHeader.Item>

            <ListHeader.Item
                className={classNames({ disabled: props.pagination && !props.pagination.hasNext })}
            >
                <Ripple unbounded>
                    <List.Icon>
                        <Icon
                            name={"angle-right"}
                            onClick={props.pagination && props.pagination.next}
                        />
                    </List.Icon>
                </Ripple>
            </ListHeader.Item>

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
                            props.perPageOptions &&
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
    loading: false,
    multiActions: null,
    sorters: null,
    refresh: null,
    pagination: null,
    title: null,
    setPerPage: null,
    perPageOptions: [5, 10, 25, 50],
    data: null
};

export default PaginatedList;

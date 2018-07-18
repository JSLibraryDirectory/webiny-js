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

const Loader = () => {
    return <div>loadam se...</div>
};

import { i18n } from "webiny-client";
const t = i18n.namespace("Security.UsersList");

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

type ListPagesProp = {
    next?: Function,
    previous?: Function,
    hasNext: boolean,
    hasPrevious: boolean
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
    title?: React.Node,
    data?: DataProp,

    refresh?: Function,
    loading?: boolean,
    sorters?: Array<any>, // TODO: define
    pages: ListPagesProp,
    setPerPage?: Function,

    multiActions: Array<any>, // TODO: define
    perPageOptions: Array<number>,

    modules: Object // TODO: this could be defined a bit better for sure.
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
    const meta = _.get(props, "data.meta");

    return (
        <React.Fragment>
            <ListHeader.Item>{t`{from} - {to} of {totalCount}`(meta)}</ListHeader.Item>

            <ListHeader.Item
                className={classNames({
                    disabled: !props.pages.hasPrevious
                })}
            >
                <Ripple unbounded>
                    <List.Icon>
                        <Icon name={"angle-left"} onClick={props.pages.previous} />
                    </List.Icon>
                </Ripple>
            </ListHeader.Item>

            <ListHeader.Item className={classNames({ disabled: !props.pages.hasNext })}>
                <Ripple unbounded>
                    <List.Icon>
                        <Icon name={"angle-right"} onClick={props.pages.next} />
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
    const list = _.get(props, "data.list");

    return (
        <React.Fragment>
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
            <List>
                {list && list.map(item => (
                    <List.Item key={item.id}>
                        <List.Item.Graphic>
                            <img src={"//www.gravatar.com/avatar/" + item.gravatar + "?s=48"} />
                        </List.Item.Graphic>
                        <List.Item.Text>
                            {item.firstName} {item.lastName}
                            <List.Item.Text.Secondary>{item.email}</List.Item.Text.Secondary>
                        </List.Item.Text>
                        <List.Item.Meta>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon
                                        name="edit"
                                        onClick={() => {
                                            app.router.goToRoute("current", { edit: item.id });
                                        }}
                                    />
                                </List.Icon>
                            </Ripple>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"times-circle"} />
                                </List.Icon>
                            </Ripple>
                        </List.Item.Meta>
                    </List.Item>
                ))}
            </List>
        </React.Fragment>
    );
};

PaginatedList.defaultProps = {
    title: null,
    perPageOptions: [5, 10, 25, 50],
    data: null
};

export default PaginatedList;
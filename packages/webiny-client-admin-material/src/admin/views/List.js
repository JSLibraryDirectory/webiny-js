// @flow
import * as React from "react";
import _ from "lodash";
import styled from "react-emotion";
import classNames from "classnames";
import { compose } from "recompose";

import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Checkbox from "webiny-client-ui-material/Checkbox";
import Menu from "webiny-client-ui-material/Menu";
import Ripple from "webiny-client-ui-material/Ripple";
import Grid from "webiny-client-ui-material/Grid";
import { withList} from "webiny-client/hoc";

import { i18n, inject, app } from "webiny-client";
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

const ListComponent = (props: { modules: Object, list: Object }) => {
    const list = _.get(props, "list.data.list", []);
    const meta = _.get(props, "list.data.meta", {});

    const { Loader } = props.modules;

    return (
        <React.Fragment>
            {props.list.loading && <Loader />}
            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">{t`Users`}</Grid.Cell>
                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        {t`Actions`}
                    </Grid.Cell>
                </Grid>
            </ListHeader>
            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">
                        <ListHeader.Item>
                            <Checkbox />
                        </ListHeader.Item>
                        <ListHeader.Item>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon onClick={props.list.refresh} name={"sync-alt"} />
                                </List.Icon>
                            </Ripple>
                        </ListHeader.Item>

                        <ListHeader.Item>
                            <Menu
                                handle={
                                    <Ripple unbounded>
                                        <List.Icon>
                                            <Icon name={"ellipsis-v"} />
                                        </List.Icon>
                                    </Ripple>
                                }
                            >
                                <Menu.Item
                                    onClick={function onClick() {
                                        console.log("Apple selected!");
                                    }}
                                >
                                    Apple
                                </Menu.Item>
                                <Menu.Item>Banana</Menu.Item>
                                <Menu.Item>Watermelon</Menu.Item>
                            </Menu>
                        </ListHeader.Item>
                    </Grid.Cell>
                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        {t`{from} - {to} of {totalCount}`(meta)}

                        {/* TODO: Move where more appropriate. */}
                        <ul>
                            {[5, 10, 25, 50].map(perPage => (
                                <li
                                    style={{ display: "inline-block", marginLeft: 10 }}
                                    key={perPage}
                                    onClick={() => props.list.setPerPage(perPage)}
                                >
                                    {perPage}
                                </li>
                            ))}
                        </ul>

                        <ListHeader.Item
                            className={classNames({
                                disabled: !props.list.pages.hasPrevious
                            })}
                        >
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"angle-left"} onClick={props.list.pages.previous} />
                                </List.Icon>
                            </Ripple>
                        </ListHeader.Item>

                        <ListHeader.Item
                            className={classNames({ disabled: !props.list.pages.hasNext })}
                        >
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"angle-right"} onClick={props.list.pages.next} />
                                </List.Icon>
                            </Ripple>
                        </ListHeader.Item>
                    </Grid.Cell>
                </Grid>
            </ListHeader>
            <List>
                {list.map(item => (
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

export default compose(
    withList({
        withRouter: true,
        name: "test",
        entity: "SecurityUser",
        fields: "id enabled firstName lastName email createdOn gravatar"
    }),
    inject({
        modules: ["View", "List", "ListData", "Icon", "Loader", "Input", "Form"]
    })
)(ListComponent);

// @flow
import React, { Fragment } from "react";
import _ from "lodash";
import styled from "react-emotion";
import { connect } from "react-redux";
import { compose } from "recompose";
import { listEntities } from "webiny-client/actions";

import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Checkbox from "webiny-client-ui-material/Checkbox";
import Menu from "webiny-client-ui-material/Menu";
import Ripple from "webiny-client-ui-material/Ripple";
import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";

import { i18n, inject } from "webiny-client";
const t = i18n.namespace("Security.UsersList");

const ListHeader = styled("div")`
    border-bottom: 1px solid lightgray;
`;

ListHeader.Item = styled("div")`
    display: inline-block;
    vertical-align: middle;
`;

List.Icon = styled("div")`
    display: inline-block;
    height: 18px;
    width: 18px;
    padding: 11px;
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
`;

class UsersList extends React.Component  {
    renderFullNameField = (row) => {
        let fullName = _.trim(`${row.data.firstName} ${row.data.lastName}`);
        fullName = _.isEmpty(fullName) ? row.data.email : fullName;
        return (
            <span>
                <strong>{fullName}</strong>
                <br />
                {row.data.id}
            </span>
        );
    };

    componentDidMount() {
        listEntities({
            entity: "SecurityUser",
            fields: "id enabled firstName lastName email createdOn gravatar"
        });
    }

    render() {
        const { /*List*/ ListData, Link, Input, AdminLayout, Loader } = this.props.modules;

        const loading = false;

        return (
            <AdminLayout>
                <Elevation z={1} style={{ backgroundColor: "white" }}>
                    {loading && <Loader />}
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
                                            <Icon name={"sync-alt"} />
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
                                1 - 3 of 3
                                <Ripple unbounded>
                                    <List.Icon>
                                        <Icon name={"angle-left"} />
                                    </List.Icon>
                                </Ripple>
                                <Ripple unbounded>
                                    <List.Icon>
                                        <Icon name={"angle-right"} />
                                    </List.Icon>
                                </Ripple>
                            </Grid.Cell>
                        </Grid>
                    </ListHeader>
                    <List>
                        {this.props.list.map(item => (
                            <List.Item key={item.id}>
                                <List.Item.Graphic>
                                    <img
                                        src={
                                            "//www.gravatar.com/avatar/" +
                                            item.gravatar +
                                            "?s=48"
                                        }
                                    />
                                </List.Item.Graphic>
                                <List.Item.Text>
                                    {item.firstName} {item.lastName}
                                    <List.Item.Text.Secondary>
                                        {item.email}
                                    </List.Item.Text.Secondary>
                                </List.Item.Text>
                                <List.Item.Meta>
                                    <Ripple unbounded>
                                        <List.Icon>
                                            <Icon name={"edit"} />
                                        </List.Icon>
                                    </Ripple>
                                    <Ripple unbounded>
                                        <List.Icon>
                                            <Icon name={"times-circle"} />
                                        </List.Icon>
                                    </Ripple>

                                    <List.Icon>
                                        <Menu handle={<Icon name={"ellipsis-v"} />}>
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
                                    </List.Icon>
                                </List.Item.Meta>
                            </List.Item>
                        ))}
                    </List>

                </Elevation>
            </AdminLayout>
        );
    }

    __render() {
        const { View, List, ListData, Link, Icon, Input, AdminLayout, Loader } = this.props.modules;
        const Table = List.Table;

        return (
            <AdminLayout>
                <View.List>
                    {/*  <View.Header title={t`Security - Users`}>
                        <Link type="primary" route="Users.Create" align="right">
                            <Icon icon="plus-circle" />
                            {t`Create user`}
                        </Link>
                    </View.Header>*/}
                    <View.Body>
                        <ListData
                            withRouter
                            entity="SecurityUser"
                            fields="id enabled firstName lastName email createdOn gravatar"
                            search={{ fields: ["firstName", "lastName", "email"] }}
                        >
                            {({ loading, ...listProps }) => {
                                return (
                                    <Fragment>
                                        {loading && <Loader />}
                                        <List {...listProps}>
                                            <List.FormFilters>
                                                {({ apply, Bind }) => (
                                                    <Bind name="search.query">
                                                        <Input
                                                            placeholder={t`Search by name or email`}
                                                            onEnter={apply()}
                                                        />
                                                    </Bind>
                                                )}
                                            </List.FormFilters>
                                            <Table>
                                                <Table.Row>
                                                    <Table.GravatarField name="gravatar" />
                                                    <Table.Field
                                                        name="firstName"
                                                        label={t`First Name`}
                                                        sort="firstName"
                                                        route="Users.Edit"
                                                    >
                                                        {this.renderFullNameField}
                                                    </Table.Field>
                                                    <Table.Field
                                                        name="email"
                                                        sort="email"
                                                        label={t`Email`}
                                                    />
                                                    <Table.ToggleField
                                                        name="enabled"
                                                        label={t`Status`}
                                                        sort="enabled"
                                                        align="center"
                                                        message={({ value }) => {
                                                            if (value) {
                                                                return null;
                                                            }
                                                            return t`This will disable user's account and prevent him from logging in!`;
                                                        }}
                                                    />
                                                    <Table.DateField
                                                        name="createdOn"
                                                        label={t`Created On`}
                                                        sort="createdOn"
                                                    />
                                                    <Table.Actions>
                                                        <Table.EditAction route="Users.Edit" />
                                                        <Table.DeleteAction />
                                                    </Table.Actions>
                                                </Table.Row>
                                                <Table.Footer />
                                            </Table>
                                            <List.Pagination />
                                        </List>
                                    </Fragment>
                                );
                            }}
                        </ListData>
                    </View.Body>
                </View.List>
            </AdminLayout>
        );
    }
}

export default compose(
    inject({
        modules: [
            { AdminLayout: "Admin.Layout" },
            "View",
            "List",
            "ListData",
            "Link",
            "Icon",
            "Loader",
            "Input"
        ]
    }),
    connect(state => ({
        list: _.get(state, "entities.SecurityUser.lists.default.data.list", []),
        meta: _.get(state, "entities.SecurityUser.lists.default.data.meta", {})
    }))
)(UsersList);
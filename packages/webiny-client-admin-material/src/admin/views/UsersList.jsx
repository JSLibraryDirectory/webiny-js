// @flow
import * as React from "react";
import _ from "lodash";
import styled from "react-emotion";
import { compose } from "recompose";

import Input from "webiny-client-ui-material/Input";
import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Checkbox from "webiny-client-ui-material/Checkbox";
import Menu from "webiny-client-ui-material/Menu";
import Button from "webiny-client-ui-material/Button";
import Ripple from "webiny-client-ui-material/Ripple";
import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";
import Switch from "webiny-client-ui-material/Switch";
import { withList, withForm } from "webiny-client/hoc";

import { i18n, inject, app } from "webiny-client";
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

class UsersList extends React.Component {
    renderList() {
        const ListComponent = props => {
            const list = _.get(props, "list.data.list", []);
            const { Link } = this.props.modules;

            return (
                <React.Fragment>
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
                        {list.map(item => (
                            <List.Item key={item.id}>
                                <List.Item.Graphic>
                                    <img
                                        src={"//www.gravatar.com/avatar/" + item.gravatar + "?s=48"}
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
                                            <Link route="Users.List.Edit" params={{ id: item.id }}>
                                                <Icon name="edit" />
                                            </Link>
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
                </React.Fragment>
            );
        };

        const PreparedComponent = withList({
            name: "test",
            entity: "SecurityUser",
            fields: "id enabled firstName lastName email createdOn gravatar"
        })(ListComponent);

        return <PreparedComponent />;
    }

    renderForm() {
        const { Form } = this.props.modules;

        const invalidFields = {};

        const FormComponent = props => {
            const { data } = props.form;

            return (
                <Form
                    model={data}
                    invalidFields={invalidFields}
                    onSubmit={data => {
                        props.form.submit({ data });
                    }}
                >
                    {({ model, form, Bind }) => (
                        <React.Fragment>
                            {/* TODO: separate into own component */}
                            <ListHeader>
                                <Grid>
                                    <Grid.Cell span="6">{t`New User`}</Grid.Cell>
                                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                                        <Icon name={"trash"} />
                                    </Grid.Cell>
                                </Grid>
                            </ListHeader>
                            <Grid>
                                <Grid.Cell span={6}>
                                    <h2>Info</h2>
                                    <Bind name="firstName" validators={["required"]}>
                                        <Input label={t`First name`} />
                                    </Bind>
                                    <Bind name="lastName" validators={["required"]}>
                                        <Input label={t`Last name`} />
                                    </Bind>
                                    <Bind name="email" validators={["required", "email"]}>
                                        <Input label={t`Email`} description={t`Your email`} />
                                    </Bind>
                                    {/*<Grid>
                                                        <Grid.Cell span={12}>
                                                            <OptionsData
                                                                entity="SecurityGroup"
                                                                fields="id name"
                                                                labelField="name"
                                                                perPage={10}
                                                                search={{
                                                                    fields: ["name"],
                                                                    query: this.state.searchQuery
                                                                        .group
                                                                }}
                                                            >
                                                                {({ options }) => (
                                                                    <Bind name="groups">
                                                                        <AutoCompleteList
                                                                            options={options}
                                                                            label={t`Groups`}
                                                                            onSearch={query => {
                                                                                this.setState(
                                                                                    state => {
                                                                                        state.searchQuery.group = query;
                                                                                        return state;
                                                                                    }
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Bind>
                                                                )}
                                                            </OptionsData>
                                                        </Grid.Cell>
                                                    </Grid>
                                                    <Grid>
                                                        <Grid.Cell span={12}>
                                                            <OptionsData
                                                                entity="SecurityPolicy"
                                                                fields="id name"
                                                                labelField="name"
                                                                perPage={10}
                                                                search={{
                                                                    fields: ["name"],
                                                                    query: this.state.searchQuery
                                                                        .policy
                                                                }}
                                                            >
                                                                {({ options }) => (
                                                                    <Bind name="policies">
                                                                        <AutoCompleteList
                                                                            options={options}
                                                                            label={t`Policies`}
                                                                            onSearch={query => {
                                                                                this.setState(
                                                                                    state => {
                                                                                        state.searchQuery.policy = query;
                                                                                        return state;
                                                                                    }
                                                                                );
                                                                            }}
                                                                        />
                                                                    </Bind>
                                                                )}
                                                            </OptionsData>
                                                        </Grid.Cell>
                                                    </Grid>*/}
                                </Grid.Cell>
                                <Grid.Cell span={6}>
                                    <h2>Password</h2>
                                    <Bind name="password" validators={["password"]}>
                                        <Input
                                            type="password"
                                            label={t`New password`}
                                            placeholder={t`Type a new password`}
                                        />
                                    </Bind>

                                    <Bind
                                        name="confirmPassword"
                                        validators={["password", "eq:@password"]}
                                    >
                                        <Input
                                            type="password"
                                            label={t`Confirm password`}
                                            placeholder={t`Retype the new password`}
                                        >
                                            <validator>{t`Passwords do not match`}</validator>
                                        </Input>
                                    </Bind>
                                </Grid.Cell>
                            </Grid>
                            <Grid>
                                <Grid.Cell span={12}>
                                    <Bind name="enabled">
                                        <Switch label={t`Enabled`} />
                                    </Bind>
                                </Grid.Cell>
                            </Grid>
                            <Grid>
                                <Grid.Cell span={12}>
                                    <Button.Primary onClick={form.submit}>
                                        {t`Save user`}
                                    </Button.Primary>

                                    <Button.Secondary onClick={props.form.reset}>
                                        {t`Reset`}
                                    </Button.Secondary>
                                </Grid.Cell>
                            </Grid>
                        </React.Fragment>
                    )}
                </Form>
            );
        };

        const PreparedComponent = withForm({
            id: app.router.getParams("id"),
            name: "testForm",
            entity: "SecurityUser",
            fields: "id enabled firstName lastName email createdOn gravatar"
        })(FormComponent);

        return <PreparedComponent />;
    }

    render() {
        const { AdminLayout, Loader } = this.props.modules;

        const loading = false;

        return (
            <AdminLayout>
                <Elevation z={1} style={{ backgroundColor: "white" }}>
                    {loading && <Loader />}
                    <Grid>
                        <Grid.Cell span={6}>{this.renderList()}</Grid.Cell>
                        <Grid.Cell span={6}>{this.renderForm()}</Grid.Cell>
                    </Grid>
                </Elevation>
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
            "Icon",
            "Loader",
            "Input",
            "Form",
            "Link"
        ]
    })
)(UsersList);

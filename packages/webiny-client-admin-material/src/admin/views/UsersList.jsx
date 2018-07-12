// @flow
import * as React from "react";
import styled from "react-emotion";
import { compose } from "recompose";

import Input from "webiny-client-ui-material/Input";
import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";
import Switch from "webiny-client-ui-material/Switch";

import UsersListList from "./UsersListList"

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

class UsersList extends React.Component {
    renderForm() {
        return null;
        const { Form } = this.props.modules;

        const model = {};
        const onSubmit = () => {};
        const invalidFields = {};

        return (
            <Form model={model} onSubmit={onSubmit} invalidFields={invalidFields}>
                {({ model, form, Bind }) => {
                    return (
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
                        </React.Fragment>
                    );
                }}
            </Form>
        );
    }

    render() {
        const { AdminLayout, Loader } = this.props.modules;
        const loading = false;

        return (
            <AdminLayout>
                <Elevation z={1} style={{ backgroundColor: "white" }}>
                    {loading && <Loader />}
                    <Grid>
                        <Grid.Cell span={6}><UsersListList/></Grid.Cell>
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
            "Form"
        ]
    }),
)(UsersList);

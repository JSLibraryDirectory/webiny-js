// @flow
import * as React from "react";
import { compose } from "recompose";

import { Input } from "webiny-ui-material/Input";
import { Icon } from "webiny-ui-material/Icon";
import { ButtonPrimary } from "webiny-ui-material/Button";
import { Elevation } from "webiny-ui-material/Elevation";
import { Grid, Cell } from "webiny-ui-material/Grid";
import { Switch } from "webiny-ui-material/Switch";
import { DataList } from "webiny-ui-material/List";
import { withForm } from "webiny-app/hoc";
import AdminLayout from "webiny-app-admin/components/Layouts/AdminLayout";

import { i18n, inject, app } from "webiny-app";
const t = i18n.namespace("Security.UsersList");

class UsersList extends React.Component<{ modules: Object }> {
    renderForm() {
        const { Form, Loader } = this.props.modules;

        const invalidFields = {};

        return null;
        const FormComponent = props => {
            const { data } = props.form;

            return (
                <div style={{ position: "relative" }}>
                    <Form
                        model={data}
                        invalidFields={invalidFields}
                        onSubmit={data => {
                            props.form.submit({ data });
                        }}
                    >
                        {({ form, Bind }) => (
                            <React.Fragment>
                                {props.form.loading && <Loader />}
                                <Grid>
                                    <Cell span="6">{t`New User`}</Cell>
                                    <Cell span="6" style={{ textAlign: "right" }}>
                                        <Icon name={"trash"} />
                                    </Cell>
                                </Grid>
                                <Grid>
                                    <Cell span={6}>
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
                                                        <Cell span={12}>
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
                                                        </Cell>
                                                    </Grid>
                                                    <Grid>
                                                        <Cell span={12}>
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
                                                        </Cell>
                                                    </Grid>*/}
                                    </Cell>
                                    <Cell span={6}>
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
                                    </Cell>
                                </Grid>
                                <Grid>
                                    <Cell span={12}>
                                        <Bind name="enabled">
                                            <Switch label={t`Enabled`} />
                                        </Bind>
                                    </Cell>
                                </Grid>
                                <Grid>
                                    <Cell span={12}>
                                        <ButtonPrimary onClick={form.submit}>
                                            {t`Save user`}
                                        </ButtonPrimary>
                                    </Cell>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Form>
                </div>
            );
        };

        const PreparedComponent = withForm({
            id: app.router.getParams("edit"),
            name: "testForm",
            entity: "SecurityUser",
            fields: "id enabled firstName lastName email createdOn gravatar"
        })(FormComponent);

        return <PreparedComponent />;
    }

    render() {
        const { AdminLayout } = this.props.modules;
        return (
            <AdminLayout>
                <Elevation z={1} style={{ backgroundColor: "white" }}>
                    <Grid>
                        <Cell span={6} style={{ position: "relative" }}>
                            <DataList />
                        </Cell>
                        <Cell span={6} style={{ position: "relative" }}>
                            {this.renderForm()}
                        </Cell>
                    </Grid>
                </Elevation>
            </AdminLayout>
        );
    }
}

export default compose(
    inject({
        modules: [
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

// @flow
import * as React from "react";
import { i18n } from "webiny-app/i18n";
import { withForm } from "webiny-app/hoc";
import { withRouter } from "webiny-app/router";
import { compose } from "recompose";
import { Form } from "webiny-form";
import { Elevation } from "webiny-ui-material/Elevation";
import { Tabs, Tab } from "webiny-ui-material/Tabs";
import { Grid, Cell } from "webiny-ui-material/Grid";
import { Input } from "webiny-ui-material/Input";
import { ButtonPrimary, ButtonSecondary } from "webiny-ui-material/Button";
import AdminLayout from "webiny-app-admin/components/Layouts/AdminLayout";

import EntitiesList from "./PoliciesForm/EntitiesList";
import ApiAccess from "./PoliciesForm/ApiAccess";

const t = i18n.namespace("Security.PoliciesForm");

class PoliciesForm extends React.Component {
    render() {
        const { SecurityPolicyForm, router } = this.props;

        return (
            <AdminLayout>
                <Grid>
                    <Cell span={12}>
                        {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                        <Elevation z={1} style={{ background: "white", position: "relative" }}>
                            <Form
                                {...SecurityPolicyForm}
                                onSubmit={data => {
                                    SecurityPolicyForm.submit({ data });
                                }}
                            >
                                {({ data, form, Bind }) => {
                                    return (
                                        <React.Fragment>
                                            {SecurityPolicyForm.loading && (
                                                <span>Skeleton TODO</span>
                                            )}

                                            <Grid>
                                                <Cell span={6}>
                                                    <Bind name="name" validators={["required"]}>
                                                        <Input label={t`Name`} />
                                                    </Bind>
                                                </Cell>
                                                <Cell span={6}>
                                                    <Bind name="slug" validators={["required"]}>
                                                        <Input label={t`Slug`} />
                                                    </Bind>
                                                </Cell>
                                            </Grid>
                                            <Grid>
                                                <Cell span={12}>
                                                    <Bind
                                                        name="description"
                                                        validators={["required"]}
                                                    >
                                                        <Input label={t`Description`} />
                                                    </Bind>
                                                </Cell>
                                            </Grid>

                                            <Grid>
                                                <Cell span={12}>
                                                    <Tabs size="large">
                                                        <Tab label={t`Entity permissions`}>
                                                            <Grid>
                                                                <Cell span={12}>
                                                                    {/*<EntitiesList
                                                                        model={data}
                                                                        form={form}
                                                                    />*/}
                                                                </Cell>
                                                            </Grid>
                                                        </Tab>
                                                        <Tab label={t`API access`}>
                                                            <Grid>
                                                                <Cell span={12}>
                                                                  {/*  <ApiAccess
                                                                        model={data}
                                                                        form={form}
                                                                    />*/}
                                                                </Cell>
                                                            </Grid>
                                                        </Tab>
                                                    </Tabs>
                                                </Cell>
                                            </Grid>

                                            <Grid>
                                                <Cell span={12}>
                                                    <ButtonSecondary
                                                        type="default"
                                                        onClick={() =>
                                                            router.goToRoute("Policies.List")
                                                        }
                                                    >
                                                        {t`Go back`}
                                                    </ButtonSecondary>
                                                    &nbsp;
                                                    <ButtonPrimary
                                                        type="primary"
                                                        onClick={form.submit}
                                                        align="right"
                                                    >
                                                        {t`Save policy`}
                                                    </ButtonPrimary>
                                                </Cell>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }}
                            </Form>
                        </Elevation>
                    </Cell>
                </Grid>
            </AdminLayout>
        );
    }
}

export default compose(
    withRouter(),
    withForm({
        name: "SecurityPolicyForm",
        type: "Security.Policies",
        fields: "id name slug description permissions"
    })
)(PoliciesForm);

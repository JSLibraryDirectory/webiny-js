// @flow
import * as React from "react";
import { i18n, inject } from "webiny-app";
import { withForm, withRouter } from "webiny-app/hoc";
import { compose } from "recompose";

import { Elevation } from "webiny-ui-material/Elevation";
import { Tabs, Tab } from "webiny-ui-material/Tabs";
import { Grid, Cell } from "webiny-ui-material/Grid";
import { Input } from "webiny-ui-material/Input";
import { ButtonPrimary, ButtonSecondary } from "webiny-ui-material/Button";
import AdminLayout from "webiny-app-admin-material/components/Layouts/AdminLayout";
import { Form } from "webiny-form";

const t = i18n.namespace("Security.ApiTokensForm");

class ApiTokensForm extends React.Component {
    render() {
        const { SecurityApiTokenForm, router } = this.props;

        return (
            <AdminLayout>
                <Grid>
                    <Cell span={12}>
                        {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                        <Elevation z={1} style={{ background: "white", position: "relative" }}>
                            <Form
                                {...SecurityApiTokenForm}
                                onSubmit={data => {
                                    SecurityApiTokenForm.submit({ data });
                                }}
                            >
                                {({ form, Bind }) => {
                                    return (
                                        <React.Fragment>
                                            <Grid>
                                                <Cell span={6}>
                                                    <Bind name="name" validators={["required"]}>
                                                        <Input fullWidth label={t`Name`} />
                                                    </Bind>
                                                </Cell>
                                            </Grid>
                                            <Grid>
                                                <Cell span={12}>
                                                    <Bind
                                                        name="description"
                                                        validators={["required"]}
                                                    >
                                                        <Input
                                                            rows={4}
                                                            fullWidth
                                                            label={t`Description`}
                                                        />
                                                    </Bind>
                                                </Cell>
                                            </Grid>

                                            <Grid>
                                                <Cell span={12}>
                                                    <Bind name="token">
                                                        <Input
                                                            rows={5}
                                                            fullWidth
                                                            label={t`Token`}
                                                            placeholder={t`To receive a token, you must save it first.`}
                                                            disabled
                                                            description={t`Sent via "Authorization" header. Generated automatically and cannot be changed.`}
                                                        />
                                                    </Bind>
                                                </Cell>
                                            </Grid>

                                            <Grid>
                                                <Cell span={12}>
                                                    <ButtonSecondary
                                                        type="default"
                                                        onClick={() =>
                                                            router.goToRoute("ApiTokens.List")
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
                                                        {t`Save API Token`}
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
        name: "SecurityApiTokenForm",
        type: "Security.ApiTokens",
        fields: "id name slug description token permissions"
    })
)(ApiTokensForm);

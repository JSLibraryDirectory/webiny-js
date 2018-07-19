// @flow
import * as React from "react";
import { app, i18n, inject } from "webiny-client";
import { withForm, withRouter } from "webiny-client/hoc";
import { compose } from "recompose";

import EntitiesList from "./PoliciesForm/EntitiesList";
import ApiAccess from "./PoliciesForm/ApiAccess";

import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";
import Input from "webiny-client-ui-material/Input";
import Button from "webiny-client-ui-material/Button";
import Loader from "webiny-client-ui-material/Loader";

const t = i18n.namespace("Security.PoliciesForm");

class PoliciesForm extends React.Component {
    render() {
        const { AdminLayout, Form, Tabs } = this.props.modules;

        const { SecurityPolicyForm, router } = this.props;

        console.log(SecurityPolicyForm);
        return (
            <AdminLayout>
                <Grid>
                    <Grid.Cell span={12}>
                        {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                        <Elevation z={1} style={{ background: "white", position: "relative" }}>
                            <Form {...SecurityPolicyForm}>
                                {({ model, form, Bind }) => {
                                    return (
                                        <React.Fragment>
                                            {SecurityPolicyForm.loading && <Loader />}

                                            <Grid>
                                                <Grid.Cell span={6}>
                                                    <Bind name="name" validators={["required"]}>
                                                        <Input label={t`Name`} />
                                                    </Bind>
                                                </Grid.Cell>
                                                <Grid.Cell span={6}>
                                                    <Bind name="slug" validators={["required"]}>
                                                        <Input label={t`Slug`} />
                                                    </Bind>
                                                </Grid.Cell>
                                            </Grid>
                                            <Grid>
                                                <Grid.Cell span={12}>
                                                    <Bind
                                                        name="description"
                                                        validators={["required"]}
                                                    >
                                                        <Input label={t`Description`} />
                                                    </Bind>
                                                </Grid.Cell>
                                            </Grid>

                                            <Grid>
                                                <Grid.Cell span={12}>
                                                    <Tabs size="large">
                                                        <Tabs.Tab label={t`Entity permissions`}>
                                                            <Grid>
                                                                <Grid.Cell span={12}>
                                                                    <EntitiesList
                                                                        model={model}
                                                                        form={form}
                                                                    />
                                                                </Grid.Cell>
                                                            </Grid>
                                                        </Tabs.Tab>
                                                        <Tabs.Tab label={t`API access`}>
                                                            <Grid>
                                                                <Grid.Cell span={12}>
                                                                    <ApiAccess
                                                                        model={model}
                                                                        form={form}
                                                                    />
                                                                </Grid.Cell>
                                                            </Grid>
                                                        </Tabs.Tab>
                                                    </Tabs>
                                                </Grid.Cell>
                                            </Grid>

                                            <Grid>
                                                <Grid.Cell span={12}>
                                                    <Button.Secondary
                                                        type="default"
                                                        onClick={() =>
                                                            app.router.goToRoute("Policies.List")
                                                        }
                                                    >
                                                        {t`Go back`}
                                                    </Button.Secondary>
                                                    &nbsp;
                                                    <Button.Primary
                                                        type="primary"
                                                        onClick={form.submit}
                                                        align="right"
                                                    >
                                                        {t`Save policy`}
                                                    </Button.Primary>
                                                </Grid.Cell>
                                            </Grid>
                                        </React.Fragment>
                                    );
                                }}
                            </Form>
                        </Elevation>
                    </Grid.Cell>
                </Grid>
            </AdminLayout>
        );
    }
}

export default compose(
    withRouter(),
    withForm({
        id: "5b33441f46e6da560ac21ff7",
        name: "SecurityPolicyForm",
        entity: "SecurityPolicy",
        fields: "id name slug description permissions"
    }),
    inject({
        modules: [
            "Form",
            "FormData",
            "OptionsData",
            "FormError",
            "View",
            "Input",
            "Button",
            "Section",
            "Loader",
            "Tabs",
            {
                AdminLayout: "Admin.Layout"
            }
        ]
    })
)(PoliciesForm);

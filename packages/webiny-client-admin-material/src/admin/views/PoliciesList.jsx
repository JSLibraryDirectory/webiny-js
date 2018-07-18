// @flow
import * as React from "react";
import { withList } from "webiny-client/hoc";
import { inject, i18n } from "webiny-client";
import { compose } from "recompose";
import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";
import PaginatedList from "webiny-client-ui-material/PaginatedList";

const t = i18n.namespace("Security.PoliciesList");

const PoliciesList = props => {
    const { AdminLayout } = props.modules;

    return (
        <AdminLayout>
            <Grid>
                <Grid.Cell span={12}>
                    {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                    <Elevation z={1} style={{ background: "white", position: "relative" }}>
                        <PaginatedList
                            {...props.list}
                            title={t`Security Policies`}
                            sorters={{
                                name: t`Name`,
                                email: t`Email`
                            }}
                        />
                    </Elevation>
                </Grid.Cell>
            </Grid>
        </AdminLayout>
    );
};

export default compose(
    withList({
        withRouter: true,
        name: "SecurityUsers",
        entity: "SecurityUser",
        fields: "id enabled firstName lastName email createdOn gravatar"
    }),
    inject({
        modules: [
            {
                AdminLayout: "Admin.Layout"
            }
        ]
    })
)(PoliciesList);

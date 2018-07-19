// @flow
import * as React from "react";
import { app } from "webiny-client";
import { withDataList, withRouter } from "webiny-client/hoc";
import { inject, i18n } from "webiny-client";
import { compose } from "recompose";

import Elevation from "webiny-client-ui-material/Elevation";
import Grid from "webiny-client-ui-material/Grid";
import Icon from "webiny-client-ui-material/Icon";
import Ripple from "webiny-client-ui-material/Ripple";
import { DataList, List } from "webiny-client-ui-material/List";

const t = i18n.namespace("Security.PoliciesList");

const PoliciesList = props => {
    const { AdminLayout } = props.modules;

    return (
        <AdminLayout>
            <Grid>
                <Grid.Cell span={12}>
                    {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                    <Elevation z={1} style={{ background: "white", position: "relative" }}>
                        <DataList
                            {...props.PoliciesList}
                            title={t`Security Policies`}
                            sorters={{
                                name: t`Name`,
                                email: t`Email`
                            }}
                        >
                            {({ data }) => {
                                return (
                                    <List>
                                        {data.map(item => (
                                            <List.Item key={item.id}>
                                                <List.Item.Text>
                                                    {item.name}
                                                    <List.Item.Text.Secondary>
                                                        {item.description}
                                                    </List.Item.Text.Secondary>
                                                </List.Item.Text>
                                                <List.Item.Meta>
                                                    <Ripple unbounded>
                                                        {/*<List.Icon>*/}
                                                        <Icon
                                                            name="edit"
                                                            onClick={() => {
                                                                app.router.goToRoute(
                                                                    "Policies.Edit",
                                                                    {
                                                                        id: item.id
                                                                    }
                                                                );
                                                            }}
                                                        />
                                                        {/*</List.Icon>*/}
                                                    </Ripple>
                                                    <Ripple unbounded>
                                                        {/*<List.Icon>*/}
                                                        <Icon name={"times-circle"} />
                                                        {/*</List.Icon>*/}
                                                    </Ripple>
                                                </List.Item.Meta>
                                            </List.Item>
                                        ))}
                                    </List>
                                );
                            }}
                        </DataList>
                    </Elevation>
                </Grid.Cell>
            </Grid>
        </AdminLayout>
    );
};

export default compose(
    withRouter(),
    withDataList({
        name: "PoliciesList",
        entity: "SecurityPolicy",
        fields: "id name description createdOn"
    }),
    inject({
        modules: [
            {
                AdminLayout: "Admin.Layout"
            }
        ]
    })
)(PoliciesList);

// @flow
import * as React from "react";
import { withDataList, withRouter } from "webiny-client/hoc";
import { inject, i18n } from "webiny-client";
import { compose } from "recompose";

import { Elevation } from "webiny-client-ui-material/Elevation";
import { Grid, Cell } from "webiny-client-ui-material/Grid";
import { ConfirmationDialog } from "webiny-client-ui-material/ConfirmationDialog";
import { DataList, List } from "webiny-client-ui-material/List";
import { EditIcon, DeleteIcon, CreateIcon } from "webiny-client-ui-material/List/DataList/icons";
import { withSnackbar } from "webiny-client-admin-material/hoc";

const t = i18n.namespace("Security.ApiTokensList");

const ApiTokensList = props => {
    const { AdminLayout } = props.modules;
    const { ApiTokensList, router } = props;

    return (
        <AdminLayout>
            <Grid>
                <Cell span={12}>
                    {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                    <Elevation z={1} style={{ background: "white", position: "relative" }}>
                        <DataList
                            {...ApiTokensList}
                            actions={
                                <React.Fragment>
                                    <CreateIcon
                                        onClick={() => router.goToRoute("ApiTokens.Create")}
                                    />
                                </React.Fragment>
                            }
                            title={t`Security Policies`}
                            sorters={[
                                {
                                    label: "Newest to oldest",
                                    sorters: { createdOn: -1 }
                                },
                                {
                                    label: "Oldest to newest",
                                    sorters: { createdOn: 1 }
                                },
                                {
                                    label: "Name A-Z",
                                    sorters: { name: 1 }
                                },
                                {
                                    label: "Name Z-A",
                                    sorters: { name: -1 }
                                }
                            ]}
                        >
                            {({ data }) => (
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
                                                <EditIcon
                                                    name="edit"
                                                    onClick={() =>
                                                        router.goToRoute("ApiTokens.Edit", {
                                                            id: item.id
                                                        })
                                                    }
                                                />
                                                <ConfirmationDialog>
                                                    {({ showConfirmation }) => (
                                                        <DeleteIcon
                                                            onClick={() => {
                                                                showConfirmation(() => {
                                                                    ApiTokensList.delete(item.id, {
                                                                        onSuccess: () => {
                                                                            ApiTokensList.refresh();
                                                                            // TODO
                                                                            /*props.showSnackbar(
                                                                                t`Policy {name} deleted.`(
                                                                                    {
                                                                                        name:
                                                                                            item.name
                                                                                    }
                                                                                )
                                                                            );*/
                                                                        }
                                                                    });
                                                                });
                                                            }}
                                                        />
                                                    )}
                                                </ConfirmationDialog>
                                            </List.Item.Meta>
                                        </List.Item>
                                    ))}
                                </List>
                            )}
                        </DataList>
                    </Elevation>
                </Cell>
            </Grid>
        </AdminLayout>
    );
};

export default compose(
    withSnackbar(),
    withRouter(),
    withDataList({
        name: "ApiTokensList",
        type: "Security.ApiTokens",
        fields: "id name slug createdOn"
    }),
    inject({
        modules: [
            {
                AdminLayout: "Admin.Layout"
            }
        ]
    })
)(ApiTokensList);
// @flow
import * as React from "react";
import { withDataList, withRouter } from "webiny-client/hoc";
import { inject, i18n } from "webiny-client";
import { compose } from "recompose";

import { Elevation } from "webiny-client-ui-material/Elevation";
import { Grid, Cell } from "webiny-client-ui-material/Grid";
import { ConfirmationDialog } from "webiny-client-ui-material/ConfirmationDialog";
import { EditIcon, DeleteIcon, CreateIcon } from "webiny-client-ui-material/List/DataList/icons";
import { withSnackbar } from "webiny-client-admin-material/hoc";
import { DataList, List, ListItem, ListItemText, ListItemTextSecondary, ListItemMeta } from "webiny-client-ui-material/List";

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
                            title={t`API Tokens`}
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
                                        <ListItem key={item.id}>
                                            <ListItemText>
                                                {item.name}
                                                <ListItemTextSecondary>
                                                    {item.description}
                                                </ListItemTextSecondary>
                                            </ListItemText>
                                            <ListItemMeta>
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
                                            </ListItemMeta>
                                        </ListItem>
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
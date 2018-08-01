// @flow
import * as React from "react";
import { withDataList } from "webiny-app/hoc";
import { withRouter } from "webiny-app/router";
import { i18n } from "webiny-app/i18n";
import { compose } from "recompose";

import { Elevation } from "webiny-ui/Elevation";
import { Grid, Cell } from "webiny-ui/Grid";
import { ConfirmationDialog } from "webiny-ui/ConfirmationDialog";
import {
    DataList,
    List,
    ListItem,
    ListItemText,
    ListItemTextSecondary,
    ListItemMeta
} from "webiny-ui/List";

import { EditIcon, DeleteIcon } from "webiny-ui/List/DataList/icons";
import { withSnackbar } from "webiny-app-admin/hoc";
import AdminLayout from "webiny-app-admin/components/Layouts/AdminLayout";

const t = i18n.namespace("Security.PoliciesList");

const PoliciesList = props => {
    const { PoliciesList, router } = props;

    return <AdminLayout/>;

    return (
        <AdminLayout>
            <Grid>
                <Cell span={12}>
                    {/* TODO: styles must not be set inline. "position: relative" is here because of the loader. */}
                    <Elevation z={1} style={{ background: "white", position: "relative" }}>
                        <DataList
                            {...PoliciesList}
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
                                                        router.goToRoute("Policies.Edit", {
                                                            id: item.id
                                                        })
                                                    }
                                                />
                                                <ConfirmationDialog>
                                                    {({ showConfirmation }) => (
                                                        <DeleteIcon
                                                            onClick={() => {
                                                                showConfirmation(() => {
                                                                    PoliciesList.delete(item.id, {
                                                                        onSuccess: () => {
                                                                            PoliciesList.refresh();
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
        name: "PoliciesList",
        type: "Security.Policies",
        fields: "id name description createdOn"
    })
)(PoliciesList);

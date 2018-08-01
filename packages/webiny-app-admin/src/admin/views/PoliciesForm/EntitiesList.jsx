// @flow
import React, { Fragment } from "react";
import TogglePermissionButton from "./../components/TogglePermissionButton";
import _ from "lodash";
import { i18n } from "webiny-app/i18n";
import { Input } from "webiny-ui-material/Input";
import { Grid, Cell } from "webiny-ui-material/Grid";

const t = i18n.namespace("Security.EntitiesList");

const entityOperationPath = (classId, permissionClass, operation) => {
    return `permissions.entities.${classId}.${permissionClass}.operations.${operation}`;
};

class EntitiesList extends React.Component {
    renderCrudTogglePermissionButtons({ permissionClass, $this, fieldData }) {
        const { data } = this.props.form.state;
        return ["create", "read", "update", "delete"].map(operation => {
            const paths = {
                current: entityOperationPath(fieldData.classId, permissionClass.key, operation),
                others: entityOperationPath(fieldData.classId, "other", operation)
            };

            return (
                <TogglePermissionButton
                    key={`${permissionClass.key}_${operation}`}
                    label={operation.charAt(0).toUpperCase()}
                    value={_.get(data, paths.current)}
                    onClick={async () => {
                        this.props.form.setState(
                            state => {
                                if (_.get(state.data, paths.current)) {
                                    _.unset(state.data, paths.current);
                                } else {
                                    _.set(state.data, paths.current, true);
                                }
                                return state;
                            },
                            () => {
                                // Update will not happen automatically because
                                // of the parent Table component which prevents it.
                                $this.forceUpdate();
                            }
                        );
                    }}
                />
            );
        });
    }

    renderList() {
        const { List, ListData, Loader } = this.props.modules;
        const Table = List.Table;

        return (
            <ListData
                withRouter
                entity="Entity"
                fields="classId name permissions"
                search={{ fields: ["name", "slug"] }}
            >
                {({ loading, ...listProps }) => (
                    <Fragment>
                        {loading && <Loader />}

                        <List {...listProps}>
                            <List.FormFilters>
                                {({ apply }) => (
                                    <Grid>
                                        <Cell span={12}>
                                            <Input
                                                fullWidth
                                                name="search.query"
                                                placeholder={t`Search by name or slug`}
                                                onEnter={apply()}
                                            />
                                        </Cell>
                                    </Grid>
                                )}
                            </List.FormFilters>
                            <Table>
                                <Table.Row>
                                    <Table.Field name="name" label={t`Name`}>
                                        {({ data }) => (
                                            <span>
                                                <strong>{data.classId}</strong>
                                                <br />
                                                {data.name}
                                            </span>
                                        )}
                                    </Table.Field>

                                    {[
                                        { key: "owner", label: t`Owner` },
                                        { key: "group", label: t`Group` },
                                        { key: "other", label: t`Other` }
                                    ].map(permissionClass => {
                                        return (
                                            <Table.Field
                                                key={permissionClass.key}
                                                name={permissionClass.key}
                                                align={"center"}
                                                label={permissionClass.label}
                                            >
                                                {({ $this, data: fieldData }) =>
                                                    this.renderCrudTogglePermissionButtons({
                                                        permissionClass,
                                                        $this,
                                                        fieldData
                                                    })
                                                }
                                            </Table.Field>
                                        );
                                    })}
                                </Table.Row>
                            </Table>
                        </List>
                    </Fragment>
                )}
            </ListData>
        );
    }

    render() {
        const { ListData, Loader } = this.props.modules;

        return (
            <ListData
                withRouter
                entity="Entity"
                fields="classId name permissions"
                search={{ fields: ["name", "slug"] }}
            >
                {({ loading, ...listProps }) => (
                    <Fragment>
                        {loading && <Loader />}

                        {this.renderList(listProps)}
                    </Fragment>
                )}
            </ListData>
        );
    }
}

export default EntitiesList;

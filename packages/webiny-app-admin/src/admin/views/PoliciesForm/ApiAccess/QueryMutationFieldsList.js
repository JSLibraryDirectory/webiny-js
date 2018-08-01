// @flow
import React from "react";
import css from "./QueryMutationFieldsList.module.scss";
import { i18n } from "webiny-app/i18n";
import _ from "lodash";
import classNames from "classnames";

const t = i18n.namespace("Security.PermissionsForm.Scopes.QueryMutationFieldsList");

import { Input } from "webiny-ui-material/Input";
import { Checkbox } from "webiny-ui-material/Checkbox";

// TODO: implement component
// import { Scrollbar } from "webiny-ui-material/Scrollbar";

class QueryMutationFieldsList extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: null
        };
    }

    render() {
        return (
            <div className={css.wrapper}>
                <Input
                    placeholder={t`Type to filter...`}
                    value={this.state.filter}
                    onChange={filter => {
                        this.setState({ filter });
                    }}
                />

                {/* TODO: wrap below ul with Scrollbar */}
                {/*  <Scrollbar style={{ height: 600 }} autoHide>

                </Scrollbar>*/}

                <ul>
                    {this.props.queriesAndMutations.map(field => {
                        if (!_.isEmpty(this.state.filter)) {
                            if (
                                field.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) <
                                0
                            ) {
                                return null;
                            }
                        }

                        return (
                            <li
                                className={classNames({
                                    [css.selected]:
                                        this.props.selected &&
                                        this.props.selected.name === field.name
                                })}
                                key={field.name}
                            >
                                <div className={classNames(css.listItemWrapper, css.checkbox)}>
                                    <Checkbox
                                        value={_.get(
                                            this.props.model.permissions,
                                            `api.${field.name}`
                                        )}
                                        onChange={() => {
                                            this.props.onToggle(field);
                                        }}
                                    />
                                </div>
                                <div
                                    className={css.listItemWrapper}
                                    onClick={() => {
                                        this.props.onSelect(field);
                                    }}
                                >
                                    <div className={css.name}>{field.name}</div>
                                    <div
                                        className={classNames(css.description, {
                                            [css.missing]: !field.description
                                        })}
                                    >
                                        {field.description || t`Missing description.`}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

QueryMutationFieldsList.defaultProps = {
    schema: null,
    model: null,
    queriesAndMutations: null,
    onSelect: _.noop,
    onToggle: _.noop,
    selected: null
};

export default QueryMutationFieldsList;

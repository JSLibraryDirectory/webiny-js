import React from "react";
import css from "./ClassesLists.scss";
import { createComponent, i18n } from "webiny-app";
import _ from "lodash";
import classNames from "classnames";

const t = i18n.namespace("Security.PermissionsForm.Scopes.ClassesLists");

class ClassesLists extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: null
        };

        this.renderListItem = this.renderListItem.bind(this);
    }

    renderListItem(field, type) {
        const { Checkbox } = this.props.modules;

        let modelPath = type === "role" ? `roles.${field.id}` : `${field.id}`;

        return (
            <li
                className={classNames({
                    [css.selected]: this.props.selected && this.props.selected.name === field.name
                })}
                key={field.name}
            >
                <div className={classNames(css.listItemWrapper, css.checkbox)}>
                    <Checkbox
                        value={_.get(this.props.model, modelPath)}
                        onChange={() => {
                            this.props.onToggle(field, type);
                        }}
                    />
                </div>
                <div
                    className={css.listItemWrapper}
                    onClick={() => {
                        this.props.onSelect(field, type);
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
    }

    render() {
        const { Input, Scrollbar } = this.props.modules;

        return (
            <div className={css.wrapper}>
                <ul>
                    {this.props.classesRoles.classes.map(item => {
                        return this.renderListItem(item, "class");
                    })}
                </ul>

                <h3>{t`Roles`}</h3>
                <h4>{t`Choose roles`}</h4>

                <Input
                    placeholder={t`Type to filter...`}
                    value={this.state.filter}
                    onChange={filter => {
                        this.setState({ filter });
                    }}
                />
                <Scrollbar style={{ height: 300 }} autoHide>
                    <ul>
                        {this.props.classesRoles.roles.map(item => {
                            if (!_.isEmpty(this.state.filter)) {
                                if (
                                    item.name
                                        .toLowerCase()
                                        .indexOf(this.state.filter.toLowerCase()) < 0
                                ) {
                                    return null;
                                }
                            }
                            return this.renderListItem(item, "role");
                        })}
                    </ul>
                </Scrollbar>
            </div>
        );
    }
}

ClassesLists.defaultProps = {
    model: null,
    classesRoles: null,
    onSelect: _.noop,
    onToggle: _.noop,
    selected: null
};

export default createComponent(ClassesLists, {
    modules: ["Input", "Checkbox", "Scrollbar"]
});
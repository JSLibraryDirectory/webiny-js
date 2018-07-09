// @flow
import * as React from "react";
import type { FormComponentProps } from "./../types";
import type Checkbox from "./Checkbox";

type Props = FormComponentProps & {
    // Form element's label.
    label?: string,

    // Form element's description.
    description?: string,

    // An array of Checkbox components.
    children: ({
        onChange: (id: string | number) => () => void
    }) => React.ChildrenArray<React.Element<Checkbox>>
};

class CheckboxGroup extends React.Component<Props> {
    render() {
        const { description, label, validation = { isValid: null } } = this.props;

        return (
            <React.Fragment>
                {label && (
                    <div className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
                        {label}
                    </div>
                )}

                {this.props.children({
                    onChange: value => {
                        return () => {
                            const values = Array.isArray(this.props.value) ? this.props.value : [];
                            const index = values.indexOf(value);
                            if (index > -1) {
                                values.splice(index, 1);
                            } else {
                                values.push(value);
                            }

                            this.props.onChange(values);
                        };
                    },
                    getValue: id => {
                        const values = Array.isArray(this.props.value) ? this.props.value : [];
                        return values.includes(id);
                    }
                })}

                {validation.isValid === false && (
                    <div className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
                        {validation.message}
                    </div>
                )}

                {validation.isValid !== false &&
                    description && (
                        <div className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
                            {description}
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default CheckboxGroup;

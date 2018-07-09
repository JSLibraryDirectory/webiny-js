// @flow
import * as React from "react";
import type { FormComponentProps } from "./../types";
import type Radio from "./Radio";

type Props = FormComponentProps & {
    // Form element's label.
    label?: string,

    // Form element's description.
    description?: string,

    // An array of Radio components.
    children: ({
        onChange: (id: string | number) => () => void
    }) => React.ChildrenArray<React.Element<Radio>>
};

class RadioGroup extends React.Component<Props> {
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
                        return () => this.props.onChange(value);
                    },
                    getValue: id => this.props.value === id
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

export default RadioGroup;

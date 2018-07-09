// @flow
import * as React from "react";
import { Checkbox as RmwcCheckbox } from "rmwc/Checkbox";
import CheckboxGroup from "./CheckboxGroup";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is checkbox disabled?
    disabled?: boolean,

    // Description beneath the checkbox.
    description?: string
};

/**
 * Single Checkbox component can be used to store simple boolean values.
 *
 * Grouping multiple Checkbox components with Checkbox.Group will allow to store an array of selected values.
 * In that case, each Checkbox component must receive value and onChange callback via props.
 */
class Checkbox extends React.Component<Props> {
    static Group: Checkbox.Group = CheckboxGroup;

    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange && this.props.onChange(e.target.checked);
    };

    render() {
        const { value, label, disabled, description, validation = { isValid: null } } = this.props;
        return (
            <React.Fragment>
                <RmwcCheckbox
                    disabled={disabled}
                    checked={Boolean(value)}
                    onChange={this.onChange}
                    label={label}
                />
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

export default Checkbox;

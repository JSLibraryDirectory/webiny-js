// @flow
import * as React from "react";
import { Switch as RmwcSwitch } from "rmwc/Switch";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is switch disabled?
    disabled?: boolean,

    // Description beneath the switch.
    description?: string
};

/**
 * Switch component can be used to store simple boolean values.
 */
class Switch extends React.Component<Props> {
    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange && this.props.onChange(e.target.checked);
    };

    render() {
        const { value, label, disabled, description, validation = { isValid: null } } = this.props;
        return (
            <React.Fragment>
                <RmwcSwitch
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

export { Switch };

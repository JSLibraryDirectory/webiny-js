// @flow
import * as React from "react";
import { Radio as RmwcRadio } from "rmwc/Radio";
import { TextFieldHelperText } from "rmwc/TextField";
import RadioGroup from "./RadioGroup";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is radio disabled?
    disabled?: boolean,

    // Description beneath the radio.
    description?: string
};

/**
 * Wrap Radio components with Radio.Group to create a set of options.
 * Each Radio component must receive value and onChange callback via props.
 */
class Radio extends React.Component<Props> {
    /**
     * Radio.Group component - must wrap base Radio components.
     * @type {RadioGroup}
     */
    static Group: Radio.Group = RadioGroup;

    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange && this.props.onChange(e.target.checked);
    };

    render() {
        const { value, label, disabled, description, validation = { isValid: null } } = this.props;
        return (
            <React.Fragment>
                <RmwcRadio
                    disabled={disabled}
                    checked={Boolean(value)}
                    onChange={this.onChange}
                    label={label}
                />
                {validation.isValid === false && (
                    <TextFieldHelperText persistent validationMsg>
                        {validation.message}
                    </TextFieldHelperText>
                )}
                {validation.isValid !== false &&
                    description && (
                        <TextFieldHelperText persistent>{description}</TextFieldHelperText>
                    )}
            </React.Fragment>
        );
    }
}

export default Radio;

// @flow
import * as React from "react";
import { Checkbox } from "rmwc/Checkbox";
import { TextFieldHelperText } from "rmwc/TextField";

type Props = {
    /* Floating label .*/
    label?: string,
    /* Is input disabled? */
    disabled?: boolean,
    /* Description beneath the input. */
    description?: string,
    /* Provided by <Form> component. */
    validation?: {
        /* Is input value valid? */
        isValid: null | boolean,
        /* Error message if input is not valid. */
        message: null | string,
        /* Any validation result returned by the validator. */
        results: mixed
    },
    /* Provided by <Form> component to perform validation when value has changed. */
    validate?: () => Promise<mixed>,
    /* Input value. */
    value: string,
    /* A callback that is executed each time a value is changed. */
    onChange: (value: mixed) => any
};

export default class Input extends React.Component<Props> {
    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.checked);
    };

    render() {
        const { value, label, disabled, description, validation = { isValid: null } } = this.props;
        return (
            <React.Fragment>
                <Checkbox
                    disabled={disabled}
                    value={value || false}
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

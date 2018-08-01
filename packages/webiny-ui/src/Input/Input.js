// @flow
import * as React from "react";
import { TextField, TextFieldHelperText } from "rmwc/TextField";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is input disabled?
    disabled?: boolean,

    // Description beneath the input.
    description?: string,

    // Placeholder is used with `fullWidth` prop instead of a `label`. `label` and `placeholder` are always mutually exclusive.
    placeholder?: string,

    // Type of input ()
    type?: string,

    // Converts input into a text area with given number of rows.
    rows?: number,

    // Creates an outline around input. Ignored if `fullWidth` is true.
    outlined?: boolean,

    // Stretches the input to fit available width.
    fullWidth?: boolean,

    // A ref for the native input.
    inputRef?: React.Ref<any>,

    // A leading icon. Use `<Input.Icon/>` component.
    leadingIcon?: React.Node,

    // A trailing icon. Use `<Input.Icon/>` component.
    trailingIcon?: React.Node,

    // A callback that is executed when input focus is lost.
    onBlur?: (value: mixed) => any
};

/**
 * Use Input component to store short string values, like first name, last name, e-mail etc.
 * Additionally, with rows prop, it can also be turned into a text area, to store longer strings.
 */
class Input extends React.Component<Props> {
    /**
     * An icon that can be shown inside the input.
     * @param props
     * @returns {*}
     * @constructor
     */
    static Icon = (props: Object) => <FontAwesomeIcon style={{ fontSize: 22 }} {...props} />;

    onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
        this.props.onChange && this.props.onChange(e.target.value);
    };

    onBlur = () => {
        const { validate, onBlur, value } = this.props;
        if (validate) {
            return validate().then(() => onBlur && onBlur(value));
        }
        return onBlur && onBlur(value);
    };

    render() {
        const {
            value,
            label,
            disabled,
            description,
            placeholder,
            outlined,
            rows,
            inputRef,
            fullWidth,
            validation = { isValid: null },
            leadingIcon,
            trailingIcon,
            type
        } = this.props;
        return (
            <React.Fragment>
                <TextField
                    type={type}
                    inputRef={inputRef}
                    textarea={Boolean(rows)}
                    rows={rows}
                    box={!outlined && (Boolean(leadingIcon) || Boolean(trailingIcon))}
                    outlined={outlined}
                    fullwidth={fullWidth}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={value ? String(value) : ""}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    label={!placeholder && label}
                    withLeadingIcon={leadingIcon}
                    withTrailingIcon={trailingIcon}
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

export { Input };
import React from "react";
import { TextField, TextFieldHelperText } from "rmwc/TextField";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export default InputLogic => {
    return class Input extends React.Component {
        static Icon = props => <FontAwesomeIcon style={{ fontSize: 22 }} {...props} />;

        render() {
            const {
                label,
                disabled,
                description,
                placeholder,
                rows,
                fullWidth,
                validation = { isValid: null },
                leadingIcon,
                trailingIcon,
                ...props
            } = this.props;
            return (
                <InputLogic {...props}>
                    {({ value, onChange, onBlur }) => (
                        <React.Fragment>
                            <TextField
                                textarea={Boolean(rows)}
                                rows={rows}
                                outlined={!fullWidth && !rows}
                                fullwidth={fullWidth}
                                placeholder={placeholder}
                                disabled={disabled}
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                onBlur={onBlur}
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
                                    <TextFieldHelperText persistent>
                                        {description}
                                    </TextFieldHelperText>
                                )}
                        </React.Fragment>
                    )}
                </InputLogic>
            );
        }
    };
};

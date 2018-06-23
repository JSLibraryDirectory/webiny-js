import React from "react";
import { TextField, TextFieldHelperText } from "rmwc/TextField";

export default TextareaLogic => {
    return class Input extends React.Component {
        render() {
            const {
                disabled,
                description,
                placeholder,
                rows,
                fullWidth,
                validation = { isValid: null },
                ...props
            } = this.props;
            return (
                <TextareaLogic {...props}>
                    {({ value, onChange, onBlur }) => (
                        <React.Fragment>
                            <TextField
                                textarea
                                rows={rows}
                                fullwidth={fullWidth}
                                placeholder={placeholder}
                                disabled={disabled}
                                value={value}
                                onChange={e => onChange(e.target.value)}
                                onBlur={onBlur}
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
                </TextareaLogic>
            );
        }
    };
};

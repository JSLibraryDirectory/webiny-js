// @flow
import * as React from "react";
import { Select as RmwcSelect } from "rmwc/Select";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is checkbox disabled?
    disabled?: boolean,

    // Description beneath the select.
    description?: string,

    // Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label.
    placeholder?: string,

    // Makes the Select have a visual box.
    box?: boolean,

    // One or more Select.Option or Select.Option.Group components.
    children: React.ChildrenArray<React.Element<typeof Select.Option | typeof Select.Option.Group>>,

    // Props for the root element. By default, additional props spread to the native select element.
    rootProps?: Object,

    // A className for the root element.
    className?: string
};

/**
 * Select component lets users choose a value from given set of options.
 */
const Select = (props: Props) => {
    const { value, description, validation = { isValid: null } } = props;
    return (
        <React.Fragment>
            <RmwcSelect
                {...props}
                value={value}
                onChange={e => {
                    props.onChange && props.onChange(e.detail.value);
                }}
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
};

/**
 * Select.Option components are immediate children of the Select component.
 * @param props
 * @returns {*}
 * @constructor
 */
Select.Option = function SelectOption(props) {
    return <option>{props.children}</option>;
};
Select.Option.displayName = "Select.Option";

/**
 * Additionally, options can be grouped.
 * @param props
 * @returns {*}
 * @constructor
 */
Select.Option.Group = function SelectOptionGroup(props) {
    return <optgroup label={props.label}>{props.children}</optgroup>;
};
Select.Option.Group.displayName = "Select.Option.Group";

export default Select;

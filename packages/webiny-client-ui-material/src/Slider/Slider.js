// @flow
import * as React from "react";
import { Slider as RmwcSlider } from "rmwc/Slider";
import type { FormComponentProps } from "./../types";

type Props = FormComponentProps & {
    // Component label.
    label?: string,

    // Is checkbox disabled?
    disabled?: boolean,

    // Description beneath the slider.
    description?: string,

    // The minimum value of the Slider.
    min: number | string,

    // The maximum value of the Slider.
    max: number | string,

    // A step to quantize values by.
    step?: number | string,

    // Displays the exact value of the Slider on the knob.
    discrete?: boolean,

    // Displays the individual step markers on the Slider track.
    displayMarkers?: boolean
};

/**
 * Slider component can be used to store simple boolean values.
 */
class Slider extends React.Component<Props> {
    onChange = (e: { detail: { value: number } }) => {
        this.props.onChange && this.props.onChange(e.detail.value);
    };

    render() {
        const { value, label, description, validation = { isValid: null } } = this.props;
        return (
            <React.Fragment>
                {label && (
                    <div className="mdc-text-field-helper-text mdc-text-field-helper-text--persistent">
                        {label}
                    </div>
                )}

                <RmwcSlider
                    {...this.props}
                    value={value || this.props.min}
                    onInput={this.onChange}
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

export default Slider;

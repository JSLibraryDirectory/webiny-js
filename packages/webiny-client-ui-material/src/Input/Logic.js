import React from "react";

class Logic extends React.Component {
    state = {
        validation: {
            valid: null,
            message: null
        }
    };

    onChange = value => {
        typeof this.props.onChange === "function"
            ? this.props.onChange(value)
            : this.setState({ value });
    };

    onBlur = () => {
        if (this.props.validate) {
            this.props.validate().then(this.props.onBlur);
        } else {
            this.props.onBlur();
        }
    };

    render() {
        const { children, value } = this.props;
        return children({
            value: value !== undefined ? value : this.state.value,
            onChange: this.onChange,
            onBlur: this.onBlur,
            validation: this.state.validation
        });
    }
}

export default Logic;

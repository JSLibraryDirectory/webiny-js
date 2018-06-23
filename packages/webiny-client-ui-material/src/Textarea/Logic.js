import React from "react";

class Logic extends React.Component {
    onChange = value => {
        typeof this.props.onChange === "function" && this.props.onChange(value);
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
            value,
            onChange: this.onChange,
            onBlur: this.onBlur
        });
    }
}

export default Logic;

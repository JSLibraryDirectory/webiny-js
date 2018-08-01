// @flow
import React from "react";
import styles from "./TogglePermissionButton.module.scss";
import _ from "lodash";
import classNames from "classnames";
import { ButtonPrimary } from "webiny-ui-material/Button";

class TogglePermissionButton extends React.Component {
    constructor() {
        super();
        this.ref = null;
    }

    render() {
        const {
            onClick,
            value
        } = this.props;
        return (
            <div className={styles.togglePermissionButtonWrapper} ref={ref => (this.ref = ref)}>
                <ButtonPrimary
                    disabled={this.props.disabled}
                    type="primary"
                    onClick={() => {
                        this.ref.querySelector("button").blur();
                        onClick();
                    }}
                    className={classNames(styles.togglePermissionButton, {
                        [styles.togglePermissionButtonExposed]: value
                    })}
                >
                    {this.props.label}
                </ButtonPrimary>
            </div>
        );
    }
}

TogglePermissionButton.defaultProps = {
    label: null,
    method: null,
    value: false,
    onClick: _.noop
};

export default TogglePermissionButton;

import React from "react";
import styles from "./TogglePermissionButton.scss";
import { createComponent } from "webiny-app";
import _ from "lodash";
import classNames from "classnames";

class TogglePermissionButton extends React.Component {
    constructor() {
        super();
        this.ref = null;
    }

    render() {
        const {
            modules: { Button },
            onClick,
            value
        } = this.props;
        return (
            <div className={styles.togglePermissionButtonWrapper} ref={ref => (this.ref = ref)}>
                <Button
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
                </Button>
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

export default createComponent(TogglePermissionButton, {
    modules: ["Button"]
});
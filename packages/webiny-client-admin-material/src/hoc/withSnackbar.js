// @flow
import * as React from "react";
import { compose, withProps } from "recompose";
import { showSnackbar } from "./../actions/snackbar.actions";

export default () => {
    return (BaseComponent: typeof React.Component) => {
        return compose(
            withProps(props => {
                return Object.assign({}, props, {
                    showSnackbar: message => {
                        showSnackbar({ message });
                    }
                });
            })
        )(BaseComponent);
    };
};

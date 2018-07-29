// @flow
import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
// import { Snackbar as UiSnackbar } from "webiny-client-ui-material/Snackbar";
 import { Snackbar } from "rmwc/Snackbar";
import _ from "lodash";
import { hideSnackbar } from "./../actions/snackbar.actions";

const SnackbarMain = props => {
    const { snackbar } = props;

    return null;
    return <Snackbar
        show={!!snackbar}
        onHide={hideSnackbar}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
    />;

    return <UiSnackbar message={"asd"} onHide={hideSnackbar} show={!!snackbar} />;
};

export default compose(
    connect(state => ({
        snackbar: _.get(state, "ui.snackbar")
    }))
)(SnackbarMain);

// @flow
import React from "react";
import TopProgressBar from "./../TopProgressBar";
import Snackbar from "./../Snackbar";

class EmptyLayout extends React.Component {
    render() {
        return (
            <div className="master minimized">
                <TopProgressBar />
                <Snackbar />
                <div className="master-content">
                    <div className="container-fluid">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default EmptyLayout;

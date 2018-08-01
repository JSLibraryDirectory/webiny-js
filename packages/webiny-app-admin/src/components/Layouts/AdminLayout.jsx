// @flow
import React from "react";
import TopProgressBar from "./../TopProgressBar";
import Snackbar from "./../Snackbar";

import Header from "webiny-app-admin/components/Header";
import Footer from "webiny-app-admin/components/Footer";
import Navigation from "webiny-app-admin/components/Navigation";

/**
 * AdminLayout is the main container that will hold all other components.
 * This component is the first one to render in the <body> element.
 */
class AdminLayout extends React.Component {
    render() {
        return (
            <div className="master minimized">
                <Header />
                <Navigation />
                <TopProgressBar />
                <Snackbar />
                <div style={{ width: "80%", margin: "0 auto", paddingTop: 100 }}>
                    <div>{this.props.children}</div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default AdminLayout;
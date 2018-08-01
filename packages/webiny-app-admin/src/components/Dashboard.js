// @flow
import React from "react";
import { i18n } from "webiny-app/i18n";

const t = i18n.namespace("Webiny.Admin.Layout.Dashboard");
class Dashboard extends React.Component {
    render() {
        const { View } = this.props;
        return (
            <View.Dashboard>
                <View.Header
                    title={t`Welcome to Webiny!`}
                    description={t`This is a demo dashboard! From here you can start developing your almighty app.`}
                />
            </View.Dashboard>
        );
    }
}

export default Dashboard;

// @flow
import React from "react";
import { router } from "./index";

export default () => {
    return BaseComponent => {
        const Component = props => <BaseComponent {...props} router={router} />;
        Component.displayName = "withRouter";
        return Component;
    };
};

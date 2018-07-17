// @flow
import { compose, withProps } from "recompose";
import { app } from "webiny-client";

export default () => {
    return BaseComponent => {
        return compose(
            withProps(() => {
                return { router: app.router };
            })
        )(BaseComponent);
    };
};

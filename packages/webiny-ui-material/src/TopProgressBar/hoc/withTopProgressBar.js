// @flow
import * as React from "react";
import { TopProgressBar } from "webiny-ui-material/TopProgressBar";

const withTopProgressBar = () => {
    return BaseComponent => {
        const WithTopProgressBar = props => {
            return (
                <TopProgressBar>
                    {({ start, finish }) => (
                        <BaseComponent
                            {...props}
                            startTopProgressBar={start}
                            finishTopProgressBar={finish}
                        />
                    )}
                </TopProgressBar>
            );
        };

        return WithTopProgressBar;
    };
};

export default withTopProgressBar;

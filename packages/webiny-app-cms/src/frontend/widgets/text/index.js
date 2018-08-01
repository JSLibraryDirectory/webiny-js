import React from "react";
import { inject } from "webiny-app";
import { Widget } from "webiny-app-cms";

const TextComponent = inject({ modules: ["SlateEditor"] })(
    ({ widget: { data }, modules: { SlateEditor } }) => <SlateEditor value={data.text} />
);

/**
 * Text widget plugin.
 */
class Text extends Widget {
    render({ WidgetContainer }) {
        return (
            <WidgetContainer>
                {({ widgetProps }) => <TextComponent {...widgetProps} />}
            </WidgetContainer>
        );
    }
}

export default Text;

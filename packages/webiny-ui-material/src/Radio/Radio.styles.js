// @flow
import { css } from "emotion";

/**
 * Controls the helper text below the checkbox.
 * @type {string}
 */
const webinyRadioHelperText = css(
    {},
    {
        "&.mdc-text-field-helper-text": {
            paddingLeft: 10
        }
    }
);

const webinyRadioTitle = css(
    {},
    {
        "&.mdc-text-field-helper-text": {
            //paddingLeft: 10,
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBottom: "5px"
        }
    }
);

export { webinyRadioHelperText, webinyRadioTitle };

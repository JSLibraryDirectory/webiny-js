import React from "react";
import Remarkable from "react-remarkable";
import hljs from "highlight.js";

export default class Markdown extends React.Component {
    render() {
        const options = {
            html: true,
            linkTarget: "_parent",
            langPrefix: "lang-",
            highlight(code, lang) {
                return hljs.highlight(lang, code).value;
            }
        };

        return (
            <div className={"markdown-body"}>
                <Remarkable source={this.props.source} options={options} />
            </div>
        );
    }
}

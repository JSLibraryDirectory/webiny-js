import React from "react";
import Highlight from "react-highlight.js";
import reactElementToJSXString from "react-element-to-jsx-string";
import copy from "copy-to-clipboard";

const elementToString = element => {
    return reactElementToJSXString(element, {
        showDefaultProps: false,
        showFunctions: false
    });
};

class CodeBlock extends React.Component {
    state = { copied: false };

    copy = source => {
        copy(source);
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false });
            }, 2000);
        });
    };

    render() {
        const { children } = this.props;
        const source = typeof children === "string" ? children : elementToString(children);
        return (
            <div>
                {this.props.copy && (
                    <a href={"javascript:void(0)"} onClick={() => this.copy(source)}>
                        {this.state.copied ? "Copied!" : "Copy to clipboard"}
                    </a>
                )}
                <Highlight language={this.props.lang || "html"}>{source}</Highlight>
            </div>
        );
    }
}

export default CodeBlock;

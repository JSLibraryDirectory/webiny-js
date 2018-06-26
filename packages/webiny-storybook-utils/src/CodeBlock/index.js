import React from "react";
import Highlight from "react-highlight.js";
import copy from "copy-to-clipboard";
import elementToString from "react-element-to-jsx-string";
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babylon";

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

        let source = children;
        if (typeof children !== "string") {
            source = elementToString(source, { showDefaultProps: false, showFunctions: true });
        }

        return (
            <div>
                {this.props.copy && (
                    <a href={"javascript:void(0)"} onClick={() => this.copy(source)}>
                        {this.state.copied ? "Copied!" : "Copy to clipboard"}
                    </a>
                )}
                <Highlight language={this.props.lang || "html"}>
                    {prettier
                        .format(source, { parser: "babylon", plugins: [babylon] })
                        .replace(">;", ">")}
                </Highlight>
            </div>
        );
    }
}

export default CodeBlock;

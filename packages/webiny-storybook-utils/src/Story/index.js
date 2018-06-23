import React from "react";
import CodeBlock from "../CodeBlock";
import Markdown from "../Markdown";

class Story extends React.Component {
    static Readme = ({ children }) => <Markdown source={children} />;

    static Props = ({ children }) => (
        <React.Fragment>
            <h2>Props</h2>
            <CodeBlock lang={"js"}>{children}</CodeBlock>
        </React.Fragment>
    );

    static Sandbox = ({ children }) => (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%", marginRight: 15 }}>
                <h2>Example</h2>
                {children}
            </div>
            <div style={{ width: "50%" }}>
                <h2>Code</h2>
                <CodeBlock copy={true}>{children}</CodeBlock>
            </div>
        </div>
    );

    render() {
        return (
            <div className={"markdown-body"} style={{ padding: "0 20px" }}>
                {this.props.children}
            </div>
        );
    }
}

export default Story;

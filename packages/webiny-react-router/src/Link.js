// @flow
import React from "react";
import isString from "lodash/isString";
import each from "lodash/each";

class Link extends React.Component {

    static defaultProps = {
        disabled: false,
        url: null,
        title: null,
        route: null,
        preventScroll: false,
        params: {},
        newTab: false,
        className: null,
        tabIndex: null,
        onClick: null
    };

    allowedProps = ["className", "style", "target", "href", "onClick", "title", "tabIndex", "disabled"];

    getLinkProps = () => {
        const { ...props } = this.props;

        props.href = "javascript:void(0)";

        if (!props.disabled) {
            if (props.url) {
                // Let's ensure we have at least http:// specified - for cases where users just type www...
                if (!/^(f|ht)tps?:\/\//i.test(props.url) && !props.url.startsWith("/")) {
                    props.url = "http://" + props.url;
                }
                props.href = props.url;
            } else if (props.route) {
                let route = props.route;
                if (isString(route)) {
                    // route = route === "current" ? app.router.route : app.router.getRoute(route);
                }

                props.href = "javascript:void(0)";
/*
                if (!route) {
                    props.href = "javascript:void(0)";
                } else {
                    props.href = app.router.createHref(route.name, props.params);
                    if (props.href.startsWith("//")) {
                        props.href = props.href.substring(1); // Get everything after first character (after first slash)
                    }
                }*/
            }
        }

        if (props.newTab) {
            props.target = "_blank";
        }


        if (props.preventScroll) {
            props["data-prevent-scroll"] = true;
        }

        const finalProps = [];
        each(props, (value, prop) => {
            if (this.allowedProps.includes(prop) || prop.startsWith("data-")) {
                finalProps[prop] = value;
            }
        });

        if (props.onClick) {
            props.onClick = e => this.props.onClick({ event: e });
        }

        return finalProps;
    };

    render() {
        return <a {...this.getLinkProps()}>{this.props.children}</a>;
    }
}

export default Link;

// @flow
import React from "react";
import _ from "lodash";
import { app, inject } from "webiny-client";
import Drawer from "webiny-client-ui-material/Drawer";
import { List } from "webiny-client-ui-material/List";

@inject({
    modules: [
        "Link",
        {
            Desktop: "Admin.Navigation.Desktop",
            Mobile: "Admin.Navigation.Mobile"
        }
    ]
})
class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            highlight: null,
            display: window.outerWidth > 768 ? "desktop" : "mobile"
        };

        this.auth = app.security;
        this.checkDisplayInterval = null;

        window.menu = open => {
            this.setState({ open });
        };
    }

    componentDidMount() {
        if (this.auth) {
            // Navigation is rendered based on user roles so we need to watch for changes
            this.unwatch = this.auth.onIdentity(identity => {
                this.setState({ user: identity });
            });

            this.setState({ user: this.auth.identity });
        }

        this.checkDisplayInterval = setInterval(() => {
            this.setState({ display: window.outerWidth > 768 ? "desktop" : "mobile" });
        }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.checkDisplayInterval);

        // Release data cursors
        this.unwatch && this.unwatch();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.state, nextState);
    }

    render() {
        return (
            <Drawer mode="temporary" open={this.state.open}>
                <Drawer.Header>Main Menu</Drawer.Header>
                <Drawer.Content>
                    <div>
                        <List>
                            <List.Item>
                                <List.Item.Text>Users</List.Item.Text>
                            </List.Item>

                            <List.Item>
                                <List.Item.Text>Companies</List.Item.Text>
                            </List.Item>

                            <List.Item>
                                <List.Item.Text>
                                    Brands
                                    <List.Item.Text.Secondary>
                                        2 new brands
                                    </List.Item.Text.Secondary>
                                </List.Item.Text>
                            </List.Item>

                            <List.Item>
                                <List.Item.Text>ACL</List.Item.Text>
                            </List.Item>
                            <List.Item>
                                <List.Item.Text>Settings</List.Item.Text>
                            </List.Item>

                            <List.Item>
                                <List.Item.Text>
                                    <div onClick={() => this.setState({ open: false })}>
                                        Hide menu
                                    </div>
                                </List.Item.Text>
                            </List.Item>
                        </List>
                    </div>
                </Drawer.Content>
            </Drawer>
        );
    }
    __render() {
        if (this.props.render) {
            return this.props.render.call(this);
        }

        const { Desktop, Mobile } = this.props.modules;
        const props = {
            highlight: this.state.highlight
        };

        if (this.state.display === "mobile") {
            return <Mobile {...props} />;
        }

        return <Desktop {...props} />;
    }
}

export default Navigation;

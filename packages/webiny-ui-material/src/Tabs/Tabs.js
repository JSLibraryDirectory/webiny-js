// @flow
import * as React from "react";
import { Icon } from "../Icon/Icon";

import {
    TabBar,
    Tab as RmwcTab,
    TabIcon as RmwcTabIcon,
    TabIconText,
    TabBarScroller
} from "rmwc/Tabs";

type Props = {
    // Any element that needs to be highlighted.
    children?: React.Node,

    withScroll?: boolean
};

type State = {
    activeTabIndex: number
};

const Tab = () => {};

/**
 * Use Tabs component to display a list of choices, once the handler is triggered.
 */
class Tabs extends React.Component<Props, State> {
    static defaultProps = {
        withScroll: false
    };

    state = {
        activeTabIndex: 0
    };

    render() {
        const tabs = React.Children.map(this.props.children, child => {
            return {
                label: child.props.label,
                children: child.props.children,
                icon: child.props.icon
            };
        });

        const content = (
            <TabBar
                activeTabIndex={this.state.activeTabIndex}
                onChange={evt => this.setState({ activeTabIndex: evt.detail.activeTabIndex })}
            >
                {tabs.map(item => {
                    return (
                        <RmwcTab key={item.label}>
                            {item.icon && <RmwcTabIcon>{item.icon}</RmwcTabIcon>}
                            <TabIconText>{item.label}</TabIconText>
                        </RmwcTab>
                    );
                })}
            </TabBar>
        );

        if (this.props.withScroll) {
            return (
                <React.Fragment>
                    <TabBarScroller>{content}</TabBarScroller>
                    {tabs[this.state.activeTabIndex].children}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                {content}
                {tabs[this.state.activeTabIndex].children}
            </React.Fragment>
        );
    }
}

const TabIcon = (props: Object) => {
    return <Icon className={"mdc-tab__icon"} {...props} />;
};

export { Tabs, Tab, TabIcon };

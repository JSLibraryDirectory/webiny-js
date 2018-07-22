// @flow
import * as React from "react";
import { Menu as BaseMenu, MenuItem, MenuAnchor } from "rmwc/Menu";

type Props = {
    // One or more MenuItem components.
    children: React.ChildrenArray<React.Element<typeof MenuItem>>,

    // A handler which triggers the menu, eg. button or link.
    handle?: React.Node
};

type State = {
    menuIsOpen: boolean
};

/**
 * Use Menu component to display a list of choices, once the handler is triggered.
 */
class Menu extends React.Component<Props, State> {
    /**
     * Each menu item must be a MenuItem component (its content can by anything).
     * @type {React.ComponentType<any>}
     */
    static Item = MenuItem;

    static defaultProps = {
        handle: null
    };

    state = {
        menuIsOpen: false
    };

    render() {
        return (
            <MenuAnchor>
                <BaseMenu
                    open={this.state.menuIsOpen}
                    onClose={() => this.setState({ menuIsOpen: false })}
                >
                    {this.props.children}
                </BaseMenu>
                {this.props.handle &&
                    // $FlowFixMe
                    React.cloneElement(this.props.handle, {
                        onClick: () => {
                            this.setState({ menuIsOpen: true });
                        }
                    })}
            </MenuAnchor>
        );
    }
}

export { Menu, MenuItem };

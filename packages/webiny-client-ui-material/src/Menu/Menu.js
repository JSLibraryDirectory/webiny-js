// @flow
import * as React from "react";
import { Menu as BaseMenu, MenuItem, MenuAnchor } from "rmwc/Menu";
import styled from "react-emotion";

type Props = {
    // One or more MenuItem components.
    children: React.ChildrenArray<React.Element<typeof MenuItem>>,

    // A handler which triggers the menu, eg. button or link.
    handle?: React.Node,

    // Position the menu to one of anchor corners.
    // 'bottomEnd' | 'bottomLeft' | 'bottomRight' | 'bottomStart' | 'topEnd' | 'topLeft' | 'topRight' | 'topStart'
    anchor?: string,

    // Class that will be added to the Menu element.
    className?: string
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
        handle: null,
        anchor: "topStart"
    };

    state = {
        menuIsOpen: false
    };

    render() {
        return (
            <MenuAnchor>
                <BaseMenu
                    anchorCorner={this.props.anchor}
                    open={this.state.menuIsOpen}
                    className={this.props.className}
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

const MenuDivider = styled("div")({
    width: "100%",
    height: 1,
    margin: "5px 0px",
    backgroundColor: "var(--webiny-theme-border)"
});

export { Menu, MenuItem, MenuDivider };

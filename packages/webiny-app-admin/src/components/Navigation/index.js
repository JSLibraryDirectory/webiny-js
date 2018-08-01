// @flow
import React from "react";
//import { Link } from "webiny-ui-material/Link";
import { Drawer, DrawerHeader, DrawerContent } from "webiny-ui-material/Drawer";
import { List, ListItem, ListItemText, ListItemGraphic } from "webiny-ui-material/List";
import { IconButton } from "webiny-ui-material/Button";
import { connect } from "react-redux";
import compose from "recompose/compose";
import _ from "lodash";
import { getPlugins } from "webiny-app/plugins";
import Menu from "./Menu";
import { toggleMenu } from "./../../actions/menu.actions";
import utils from "./utils";

function findMenuIndex(findIn, menu) {
    return _.findIndex(findIn, item => {
        const id = item.props.id || item.props.label;
        const menuId = menu.props.id || menu.props.label;
        return id === menuId;
    });
}

function mergeMenus(menu1, menu2) {
    // If requested, overwrite existing menu and exit
    if (menu2.props.overwriteExisting) {
        return menu2;
    }

    const omit = ["render", "children"];

    // Create merged props object
    const newProps = _.merge({}, _.omit(menu1.props, omit), _.omit(menu2.props, omit));
    let newChildren = React.Children.toArray(menu1.props.children);
    newProps.key = menu1.props.id || menu1.props.label;
    React.Children.forEach(menu2.props.children, child => {
        const existingMenu = findMenuIndex(newChildren, child);
        if (existingMenu > -1) {
            newChildren[existingMenu] = mergeMenus(newChildren[existingMenu], child);
        } else {
            newChildren.push(
                React.cloneElement(child, { key: child.props.id || child.props.label })
            );
        }
    });

    return React.createElement(Menu, newProps, newChildren);
}

function sortMenus(menus, level = 0) {
    menus = _.sortBy(menus, ["props.order", "props.label"]);
    return menus.map(menu => {
        return React.cloneElement(
            menu,
            _.assign({}, menu.props, { level }),
            sortMenus(React.Children.toArray(menu.props.children), level + 1)
        );
    });
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.menu = [];

        this.renderer = menu => {
            const props = _.clone(menu.props);
            if (!utils.canAccess(props)) {
                return null;
            }

            const children = React.Children.toArray(props.children);
            const hasChildren = children.length > 0;
            const { Link } = this.props.modules;

            const linkProps = {
                key: props.id,
                label: props.label,
                children: props.label
            };

            let childMenuItems = null;
            if (hasChildren) {
                // Build array of child items and check their access roles.
                childMenuItems = children.map((child, i) => {
                    if (!utils.canAccess(child.props)) {
                        return null;
                    }

                    return React.cloneElement(child, { key: i, render: this.renderer });
                });

                // If no child items are there to render - hide parent menu as well.
                if (!childMenuItems.filter(item => !_.isNil(item)).length) {
                    return null;
                }
            }

            return (
                <React.Fragment>
                    <List>
                        <ListItem key={props.id}>
                            {props.icon && (
                                <ListItemGraphic>
                                    <IconButton icon={props.icon} />
                                </ListItemGraphic>
                            )}
                            <ListItemText>
                                {utils.getLink(props.route, Link, linkProps)}
                            </ListItemText>
                        </ListItem>
                    </List>
                    {hasChildren && childMenuItems}
                </React.Fragment>
            );
        };
    }

    addMenu = menu => {
        // Make sure we have a menu ID
        menu = React.cloneElement(menu, { id: menu.props.id || menu.props.label });

        // If top-level menu already exists...
        const menuIndex = findMenuIndex(this.menu, menu);
        if (menuIndex > -1) {
            // Merge new menu with existing menu
            const existingMenu = this.menu[menuIndex];
            this.menu[menuIndex] = mergeMenus(existingMenu, menu);
        } else {
            // New top-level menu
            this.menu.push(menu);
        }

        // Sort menu by order, then by label (alphabetically)
        this.menu = sortMenus(this.menu);

        return this;
    };

    getMenu = () => {
        if (!this.menu.length) {
            const menuPlugins = getPlugins("menu");
            menuPlugins &&
                menuPlugins.forEach(plugin => {
                    this.addMenu(plugin.render({ Menu }));
                });
        }

        return this.menu;
    };

    render() {
        return (
            <Drawer mode="temporary" open={this.props.showMenu} onClose={toggleMenu}>
                <DrawerHeader>Main Menu</DrawerHeader>
                <DrawerContent>
                    {this.getMenu().map(menu =>
                        React.cloneElement(menu, {
                            key: menu.props.id,
                            render: this.renderer
                        })
                    )}
                </DrawerContent>
            </Drawer>
        );
    }
}

export default compose(
    connect(state => ({
        // TODO: napisati selector za ovo, i mozda staviti ovo u `ui` namespace u reduxu
        showMenu: _.get(state, "admin.showMenu")
    }))
)(Navigation);

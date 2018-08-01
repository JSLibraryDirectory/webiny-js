// @flow
import React from "react";
import { inject, app } from "webiny-app";
import { Drawer, DrawerHeader, DrawerContent } from "webiny-ui-material/Drawer";
import { List, ListItem, ListItemText, ListItemGraphic } from "webiny-ui-material/List";
import { IconButton } from "webiny-ui-material/Button";
import { connect } from "react-redux";
import { compose } from "recompose";
import _ from "lodash";
import { toggleMenu } from "./../../actions/menu.actions";
import utils from "./utils";

const menu = app.services.get("menu");

class Navigation extends React.Component {
    constructor(props) {
        super(props);

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

    render() {
        return (
            <Drawer mode="temporary" open={this.props.showMenu} onClose={toggleMenu}>
                <DrawerHeader>Main Menu</DrawerHeader>
                <DrawerContent>
                    {menu.getMenu().map(menu =>
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
    inject({
        modules: ["Link"]
    }),
    connect(state => ({
        showMenu: _.get(state, "admin.showMenu")
    }))
)(Navigation);

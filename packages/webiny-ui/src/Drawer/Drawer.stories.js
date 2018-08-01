// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import { List, ListItem, ListItemText, ListItemTextSecondary } from "./../List";

import readme from "./../Drawer/README.md";
import { withKnobs, boolean, selectV2 } from "@storybook/addon-knobs";

// $FlowFixMe
import { Drawer, DrawerHeader, DrawerContent, PropsType } from "./Drawer";

const story = storiesOf("Components/Drawer", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const mode = selectV2("Mode", ["temporary", "persistent", "permanent"], "permanent");
    const open = boolean("Open", true);

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>
            <Story.Sandbox title={"drawer"}>
                <Story.Sandbox.Example title={"A list with all possible options"}>
                    <Drawer mode={mode} open={open}>
                        <DrawerHeader>Main Menu</DrawerHeader>
                        <DrawerContent>
                            <List>
                                <ListItem>
                                    <ListItemText>Users</ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>Companies</ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>
                                        Brands
                                        <ListItemTextSecondary>2 new brands</ListItemTextSecondary>
                                    </ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>ACL</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Settings</ListItemText>
                                </ListItem>
                            </List>
                        </DrawerContent>
                    </Drawer>
                </Story.Sandbox.Example>
                <Story.Sandbox.Code>
                    {`
                    <Drawer permanent={permanent} peristent={persistent} open={open} temporary={temporary}>
                        <DrawerHeader>Main Menu</DrawerHeader>
                        <DrawerContent>
                            <List>
                                <ListItem>
                                    <ListItemText>Users</ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>Companies</ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>
                                        Brands
                                        <ListItemTextSecondary>
                                            2 new brands
                                        </ListItemTextSecondary>
                                    </ListItemText>
                                </ListItem>

                                <ListItem>
                                    <ListItemText>ACL</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>Settings</ListItemText>
                                </ListItem>
                            </List>
                        </DrawerContent>
                    </Drawer>
                    `}
                </Story.Sandbox.Code>
            </Story.Sandbox>
        </Story>
    );
});

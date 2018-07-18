// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import List from "./../List";
import Ripple from "./../Ripple";
import Icon from "./../Icon";
import readme from "./../PaginatedList/README.md";
import { withKnobs, boolean, text, object } from "@storybook/addon-knobs";

// $FlowFixMe
import PaginatedList, { PropsType } from "./PaginatedList";

const story = storiesOf("Components/PaginatedList", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const props = {
        refresh: () => {
            // eslint-disable-next-line
            alert('Use the "refresh" prop to pass a callback.');
        },
        loading: boolean("Loading", false, "Basic"),
        title: text("Title", "A list of all users", "Basic"),
        multiActions: boolean("Multi actions", false, "Basic"),
        sorters: object(
            "Sorters",
            {
                "-createdOn": "Newest to oldest",
                createdOn: "Oldest to newest",
                name: "Name A-Z",
                "-name": "Name Z-A"
            },
            "Sorters"
        ),
        data: object(
            "Data",
            {
                list: [
                    {
                        id: "A",
                        firstName: "John",
                        lastName: "Doe",
                        email: "john.doe@webiny.com"
                    },
                    {
                        id: "B",
                        firstName: "Jane",
                        lastName: "Doe",
                        email: "jane.doe@webiny.com"
                    },
                    {
                        id: "C",
                        firstName: "Foo",
                        lastName: "Bar",
                        email: "foo.bar@webiny.com"
                    }
                ],
                meta: {
                    totalPages: 1,
                    totalCount: 3,
                    from: 1,
                    to: 3
                }
            },
            "Data"
        ),
        actions: null,
        pagination: object(
            "Pagination",
            {
                totalPages: 1,
                totalCount: 3,
                from: 1,
                to: 3
            },
            "Pagination"
        )
    };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <PaginatedList {...props}>
                    {({ data }) => {
                        return (
                            <List>
                                {data.list.map(item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Graphic>
                                            <img
                                                src={
                                                    "//www.gravatar.com/avatar/" +
                                                    item.gravatar +
                                                    "?s=48"
                                                }
                                            />
                                        </List.Item.Graphic>
                                        <List.Item.Text>
                                            {item.firstName} {item.lastName}
                                            <List.Item.Text.Secondary>
                                                {item.email}
                                            </List.Item.Text.Secondary>
                                        </List.Item.Text>
                                        <List.Item.Meta>
                                            <Ripple unbounded>
                                                {/*<List.Icon>*/}
                                                <Icon
                                                    name="edit"
                                                    onClick={() => {
                                                        console.log("ide redirectara");
                                                    }}
                                                />
                                                {/*</List.Icon>*/}
                                            </Ripple>
                                            <Ripple unbounded>
                                                {/*<List.Icon>*/}
                                                <Icon name={"times-circle"} />
                                                {/*</List.Icon>*/}
                                            </Ripple>
                                        </List.Item.Meta>
                                    </List.Item>
                                ))}
                            </List>
                        );
                    }}
                </PaginatedList>
            </Story.Sandbox>
        </Story>
    );
});

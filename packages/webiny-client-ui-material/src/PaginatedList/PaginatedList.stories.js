// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import List from "./../List";
import Ripple from "./../Ripple";
import Icon from "./../Icon";
import readme from "./../PaginatedList/README.md";
import { withKnobs, boolean, text, object, number, array } from "@storybook/addon-knobs";

// $FlowFixMe
import PaginatedList, { PropsType } from "./PaginatedList";

const story = storiesOf("Components/PaginatedList", module);
story.addDecorator(withKnobs);

story.add("usage", () => {
    const generalProps = {
        refresh: () => {
            // eslint-disable-next-line
            alert('Use the "refresh" prop to pass a callback.');
        },
        loading: boolean("Loading", false, "Basic"),
        title: text("Title", "A list of all users", "Basic"),
        multiActions: boolean("Multi actions", false, "Basic")
    };

    const dataProp = object(
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
    );

    const paginationProp = {
        totalPages: number("totalPages", 1, {}, "Pagination"),
        totalCount: number("totalCount", 3, {}, "Pagination"),
        from: number("from", 1, {}, "Pagination"),
        to: number("to", 3, {}, "Pagination"),
        nextPage: number("nextPage", 0, {}, "Pagination"),
        previousPage: number("previousPage", 0, {}, "Pagination"),
        setPage: page => {
            console.log(`Implement setPage method (selected ${page}).`);
        },
        perPageOptions: array("perPageOptions", [10, 25, 50], "Pagination"),
        setPerPage: perPage => {
            console.log(`Implement setPerPage method (selected ${perPage}).`);
        }
    };

    const sortersProp = {
        setSorter: sorter => {
            console.log(`Implement setSorter method (selected ${sorter}).`);
        },
        list: object(
            "Sorters",
            {
                "-createdOn": "Newest to oldest",
                createdOn: "Oldest to newest",
                name: "Name A-Z",
                "-name": "Name Z-A"
            },
            "Sorters"
        )
    };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <PaginatedList
                    {...generalProps}
                    data={dataProp}
                    pagination={paginationProp}
                    sorters={sortersProp}
                >
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

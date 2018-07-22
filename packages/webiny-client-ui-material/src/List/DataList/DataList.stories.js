// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Story from "webiny-storybook-utils/Story";
import { Ripple } from "webiny-client-ui-material/Ripple";
import { Icon } from "webiny-client-ui-material/Icon";
import readme from "./../DataList/README.md";
import { withKnobs, boolean, text, object, array } from "@storybook/addon-knobs";

// $FlowFixMe
import { DataList, PropsType } from "./DataList";
import { List } from "./../List";

const story = storiesOf("Components/List", module);
story.addDecorator(withKnobs);

story.add("data list", () => {
    const generalOptionsAndCallbacks = {
        refresh: () => {
            console.log(`Implement "refresh" method.`);
        },
        loading: boolean("Loading", false, "Basic"),
        title: text("Title", "A list of all users", "Basic"),
        multiActions: boolean("Multi actions", false, "Basic"),

        setPage: page => {
            console.log(`Implement setPage method (selected ${page}).`);
        },
        perPageOptions: array("perPageOptions", [10, 25, 50], ",", "Basic"),
        setPerPage: perPage => {
            console.log(`Implement setPerPage method (selected ${perPage}).`);
        },
        setSorters: sorter => {
            console.log(`Implement setSorters method (selected ${JSON.stringify(sorter)}).`);
        }
    };

    const dataProp = object(
        "Data",
        [
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
        "Data"
    );

    const metaProp = object(
        "Meta",
        {
            totalPages: 1,
            totalCount: 3,
            from: 1,
            to: 3,
            previousPage: null,
            nextPage: null
        },
        "Meta"
    );

    const sortersProp = {
        list: object(
            "Sorters",
            [
                {
                    label: "Newest to oldest",
                    sorters: { createdOn: -1 }
                },
                {
                    label: "Oldest to newest",
                    sorters: { createdOn: 1 }
                },
                {
                    label: "Name A-Z",
                    sorters: { name: 1 }
                },
                {
                    label: "Name Z-A",
                    sorters: { name: -1 }
                }
            ],
            "Sorters"
        )
    };

    return (
        <Story>
            <Story.Readme>{readme}</Story.Readme>
            <Story.Props>{PropsType}</Story.Props>

            <Story.Sandbox>
                <DataList
                    {...generalOptionsAndCallbacks}
                    data={dataProp}
                    meta={metaProp}
                    sorters={sortersProp.list}
                >
                    {({ data }) => {
                        return (
                            <List>
                                {data.map(item => (
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
                                                        console.log("Redirect user to form.");
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
                </DataList>
            </Story.Sandbox>
        </Story>
    );
});

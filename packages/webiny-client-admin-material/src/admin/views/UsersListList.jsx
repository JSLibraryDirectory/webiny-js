// @flow
import * as React from "react";
import _ from "lodash";
import styled from "react-emotion";
import { connect } from "react-redux";
import { compose } from "recompose";
import { loadList } from "webiny-client/actions";

import Input from "webiny-client-ui-material/Input";
import List from "webiny-client-ui-material/List";
import Icon from "webiny-client-ui-material/Icon";
import Checkbox from "webiny-client-ui-material/Checkbox";
import Menu from "webiny-client-ui-material/Menu";
import Ripple from "webiny-client-ui-material/Ripple";
import Grid from "webiny-client-ui-material/Grid";

import { i18n, inject } from "webiny-client";
const t = i18n.namespace("Security.UsersList");

const ListHeader = styled("div")`
    border-bottom: 1px solid lightgray;
`;

ListHeader.Item = styled("div")`
    display: inline-block;
    vertical-align: middle;
`;

List.Icon = styled("div")`
    display: inline-block;
    height: 18px;
    width: 18px;
    padding: 11px;
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
`;

const Lista = props => {
    const { list } = props;

    return (
        <React.Fragment>
            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">{t`Users`}</Grid.Cell>
                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        {t`Actions`}
                    </Grid.Cell>
                </Grid>
            </ListHeader>
            <ListHeader>
                <Grid>
                    <Grid.Cell span="6">
                        <ListHeader.Item>
                            <Checkbox />
                        </ListHeader.Item>
                        <ListHeader.Item>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"sync-alt"} />
                                </List.Icon>
                            </Ripple>
                        </ListHeader.Item>

                        <ListHeader.Item>
                            <Menu
                                handle={
                                    <Ripple unbounded>
                                        <List.Icon>
                                            <Icon name={"ellipsis-v"} />
                                        </List.Icon>
                                    </Ripple>
                                }
                            >
                                <Menu.Item
                                    onClick={function onClick() {
                                        console.log("Apple selected!");
                                    }}
                                >
                                    Apple
                                </Menu.Item>
                                <Menu.Item>Banana</Menu.Item>
                                <Menu.Item>Watermelon</Menu.Item>
                            </Menu>
                        </ListHeader.Item>
                    </Grid.Cell>
                    <Grid.Cell span="6" style={{ textAlign: "right" }}>
                        1 - 3 of 3
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon name={"angle-left"} />
                            </List.Icon>
                        </Ripple>
                        <Ripple unbounded>
                            <List.Icon>
                                <Icon name={"angle-right"} />
                            </List.Icon>
                        </Ripple>
                    </Grid.Cell>
                </Grid>
            </ListHeader>
            <List>
                {list.map(item => (
                    <List.Item key={item.id}>
                        <List.Item.Graphic>
                            <img src={"//www.gravatar.com/avatar/" + item.gravatar + "?s=48"} />
                        </List.Item.Graphic>
                        <List.Item.Text>
                            {item.firstName} {item.lastName}
                            <List.Item.Text.Secondary>{item.email}</List.Item.Text.Secondary>
                        </List.Item.Text>
                        <List.Item.Meta>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"edit"} />
                                </List.Icon>
                            </Ripple>
                            <Ripple unbounded>
                                <List.Icon>
                                    <Icon name={"times-circle"} />
                                </List.Icon>
                            </Ripple>

                            <List.Icon>
                                <Menu handle={<Icon name={"ellipsis-v"} />}>
                                    <Menu.Item
                                        onClick={function onClick() {
                                            console.log("Apple selected!");
                                        }}
                                    >
                                        Apple
                                    </Menu.Item>
                                    <Menu.Item>Banana</Menu.Item>
                                    <Menu.Item>Watermelon</Menu.Item>
                                </Menu>
                            </List.Icon>
                        </List.Item.Meta>
                    </List.Item>
                ))}
            </List>
        </React.Fragment>
    );
};

const connectList = ({ name, entity, fields }) => {
    return BaseComponent => {
        class Test extends React.Component {
            componentDidMount() {
                loadList({
                    name,
                    entity,
                    fields
                });
            }
            render() {
                return (
                    <span>
                        <BaseComponent {...this.props} />
                    </span>
                );
            }
        }

        return connect(state => ({
            list: _.get(state, `lists.${name}`)
        }))(Test);
    };
};

const PraznaLista = props => {
    console.log(`PraznaLista props`, props);
    return <span>ideeee</span>;
};

export default connectList({
    name: "testListaPodataka",
    entity: "SecurityUser",
    fields: "id enabled firstName lastName email createdOn gravatar"
})(PraznaLista);

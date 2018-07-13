// @flow
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { loadList } from "./../actions";
import _ from "lodash";

type WithFormParams = {
    name: string,
    entity: string,
    fields: string,
};

export default ({ name, entity, fields } : WithFormParams) => {
    return BaseComponent => {
        return compose(
            connect(state => {
                return { list: _.get(state, `lists.${name}`, {}) };
            }),
            lifecycle({
                componentDidMount() {
                    loadList({
                        name,
                        entity,
                        fields
                    });
                }
            })
        )(BaseComponent);
    };
};

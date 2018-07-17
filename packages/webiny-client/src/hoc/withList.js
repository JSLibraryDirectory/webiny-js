// @flow
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList } from "./../actions";
import _ from "lodash";

type WithFormParams = {
    name: string,
    entity: string,
    fields: string
};

export default ({ name, entity, fields }: WithFormParams) => {
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
            }),
            withProps(props => {
                props.list.refresh = () => {
                    loadList({
                        name,
                        entity,
                        fields
                    });
                };

                let hasNext = false;
                let hasPrevious = false;
                if (props.list.data) {
                    hasNext = props.list.data.meta.page < props.list.data.meta.totalPages;
                    hasPrevious = props.list.data.meta.page > 1;
                }

                props.list.pages = {
                    hasNext,
                    hasPrevious,
                    next: () => {
                        hasNext &&
                            loadList({
                                name,
                                entity,
                                fields,
                                page: props.list.data.meta.page + 1
                            });
                    },
                    previous: () => {
                        hasPrevious &&
                            loadList({
                                name,
                                entity,
                                fields,
                                page: props.list.data.meta.page - 1
                            });
                    }
                };
            })
        )(BaseComponent);
    };
};

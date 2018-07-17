// @flow
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList } from "./../actions";
import { app } from "webiny-client";
import _ from "lodash";

type WithListParams = {
    name: string,
    entity: string,
    fields: string,
    withRouter?: boolean,
    page?: number,
    perPage?: number
};

const getLoadParams = ({ name, entity, fields, withRouter }: WithListParams): WithListParams => {
    let params = { name, entity, fields };
    if (withRouter) {
        params = Object.assign(params, app.router.match.query);
    }

    return params;
};

export default (params: WithListParams) => {
    return (BaseComponent: typeof React.Component) => {
        return compose(
            connect(state => {
                return { list: _.get(state, `lists.${params.name}`, {}) };
            }),
            lifecycle({
                componentDidMount() {
                    loadList(getLoadParams(params));
                }
            }),
            withProps(props => {
                props.list.refresh = () => {
                    loadList(getLoadParams(params));
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
                        if (!hasNext) {
                            return;
                        }

                        const loadParams = getLoadParams(params);
                        loadParams.page = Number(_.get(loadParams, "page", 1)) + 1;

                        if (params.withRouter) {
                            app.router.goToRoute("current", {
                                page: loadParams.page
                            });
                            return;
                        }

                        loadList(loadParams);
                    },
                    previous: () => {
                        if (!hasPrevious) {
                            return;
                        }

                        const loadParams = getLoadParams(params);
                        loadParams.page = Number(_.get(loadParams, "page", 1)) - 1;

                        if (params.withRouter) {
                            app.router.goToRoute("current", {
                                page: loadParams.page
                            });
                            return;
                        }

                        loadList(loadParams);
                    }
                };
            })
        )(BaseComponent);
    };
};

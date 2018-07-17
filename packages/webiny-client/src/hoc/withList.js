// @flow
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList } from "./../actions";
import { withRouter } from "./../hoc";
import { app } from "webiny-client";
import _ from "lodash";

type WithListParams = {
    name: string,
    entity: string,
    fields: string,
    withRouter?: boolean,
    page?: number,
    perPage?: number,
    sort?: number,
    search?: JSON,
    filter?: JSON
};

const getLoadListParams = ({
    name,
    entity,
    fields,
    withRouter
}: WithListParams): WithListParams => {
    const params: WithListParams = {
        name,
        entity,
        fields
    };

    if (withRouter) {
        const { page, perPage, sort, search } = app.router.match.query;
        params.page = page;
        params.perPage = perPage;
        params.sort = sort;
        params.search = search;
        // params.filter = filter;
    }

    return params;
};

const applyRouteQueryParams = (params: Object) => {
    const { perPage, page, sort, search } = params;
    app.router.goToRoute("current", {
        perPage,
        page,
        sort,
        search
    });
};

export default (params: WithListParams) => {
    return (BaseComponent: typeof React.Component) => {
        return compose(
            withRouter(),
            lifecycle({
                componentDidMount() {
                    loadList(getLoadListParams(params));
                },
                componentWillReceiveProps() {
                    loadList(getLoadListParams(params));
                }
            }),
            connect(state => {
                return { list: _.get(state, `lists.${params.name}`, {}) };
            }),
            withProps(props => {
                props.list.refresh = () => {
                    loadList(getLoadListParams(params));
                };

                let hasNext = false;
                let hasPrevious = false;
                if (props.list.data) {
                    hasNext = props.list.data.meta.page < props.list.data.meta.totalPages;
                    hasPrevious = props.list.data.meta.page > 1;
                }

                props.list.setPerPage = perPage => {
                    const loadParams = getLoadListParams(params);
                    loadParams.perPage = perPage;

                    if (params.withRouter) {
                        applyRouteQueryParams(loadParams);
                        return;
                    }

                    loadList(loadParams);
                };

                props.list.pages = {
                    hasNext,
                    hasPrevious,
                    next: () => {
                        if (!hasNext) {
                            return;
                        }

                        const loadParams = getLoadListParams(params);
                        props.list.pages.set(Number(_.get(loadParams, "page", 1)) + 1);
                    },
                    previous: () => {
                        if (!hasPrevious) {
                            return;
                        }

                        const loadParams = getLoadListParams(params);
                        props.list.pages.set(Number(_.get(loadParams, "page", 1)) - 1);
                    },
                    set: (page: number) => {
                        const loadParams = getLoadListParams(params);
                        loadParams.page = page;

                        console.log(loadParams);
                        if (params.withRouter) {
                            applyRouteQueryParams(loadParams);
                            return;
                        }

                        loadList(loadParams);
                    }
                };
            })
        )(BaseComponent);
    };
};

// @flow
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList } from "./../actions";
import { withRouter } from "./../hoc";
import { app } from "webiny-client";
import _ from "lodash";

type WithListParams = {
    prop?: string,
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

/**
 * All list data is passed into child components via specific prop. Be default, "name" parameter will be
 * used to determine its name. Alternatively, "prop" parameter can be used to specify a different name.
 * @param params
 * @returns {*}
 */
const getPropKey = (params: WithListParams): string => params.prop || params.name;

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
                const prop = getPropKey(params);
                return {
                    [prop]: {
                        data: _.get(state, `lists.${params.name}.data.list`, []),
                        pagination: _.get(state, `lists.${params.name}.data.meta`, {})
                    }
                };
            }),
            withProps(props => {
                const prop = getPropKey(params);
                props[prop].refresh = () => {
                    loadList(getLoadListParams(params));
                };

                props[prop].pagination = Object.assign({}, props[prop].pagination, {
                    setPerPage: perPage => {
                        const loadParams = getLoadListParams(params);
                        loadParams.perPage = perPage;

                        if (params.withRouter) {
                            applyRouteQueryParams(loadParams);
                            return;
                        }

                        loadList(loadParams);
                    },

                    setPage: (page: number) => {
                        const loadParams = getLoadListParams(params);
                        loadParams.page = page;

                        if (params.withRouter) {
                            applyRouteQueryParams(loadParams);
                            return;
                        }

                        loadList(loadParams);
                    }
                });

                /*props[prop].sorters = {
                    setSorter
                }*/

                console.log("FINAL PROPS", props);
            })
        )(BaseComponent);
    };
};

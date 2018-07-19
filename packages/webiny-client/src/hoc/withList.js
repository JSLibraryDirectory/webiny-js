// @flow
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList } from "./../actions";
import { app } from "webiny-client";
import _ from "lodash";

type WithListParams = {
    prop?: string,
    name: string,
    entity: string,
    fields: string,
    page?: number,
    perPage?: number,
    sort?: number,
    search?: JSON,
    filter?: JSON
};

const redirectToRouteWithQueryParams = (params: Object) => {
    const { perPage, page, sort, search } = params;
    app.router.goToRoute("current", {
        perPage,
        page,
        sort,
        search
    });
};

const prepareLoadListParams = (withListParams: WithListParams, props: Object) => {
    const paramsClone = Object.assign({}, withListParams);
    if (props.router) {
        const { page, perPage, sort, search } = app.router.match.query;
        Object.assign(withListParams, {
            page,
            perPage,
            sort,
            search
        });
    } else {
        // TODO: Assign from store.
    }

    return paramsClone;
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
            lifecycle({
                componentDidMount() {
                    const preparedParams = prepareLoadListParams(params, this.props);
                    loadList(preparedParams);
                },
                componentWillReceiveProps(props) {
                    const preparedParams = prepareLoadListParams(params, props);
                    loadList(preparedParams);
                }
            }),
            connect(state => {
                const prop = getPropKey(params);
                return {
                    [prop]: {
                        data: _.get(state, `lists.${params.name}.data.list`, []),
                        meta: _.get(state, `lists.${params.name}.data.meta`, {})
                    }
                };
            }),
            withProps(props => {
                const prop = getPropKey(params);

                Object.assign(props[prop], {
                    refresh: () => {
                        const preparedParams = prepareLoadListParams(params, props);
                        loadList(preparedParams);
                    },

                    setPerPage: (perPage: number) => {
                        const preparedParams = prepareLoadListParams(params, props);
                        preparedParams.perPage = perPage;

                        if (props.router) {
                            redirectToRouteWithQueryParams(preparedParams);
                            return;
                        }

                        loadList(preparedParams);
                    },

                    setPage: (page: number) => {
                        const preparedParams = prepareLoadListParams(params, props);
                        preparedParams.page = page;

                        if (props.router) {
                            redirectToRouteWithQueryParams(preparedParams);
                            return;
                        }

                        loadList(preparedParams);
                    },

                    setSorters: () => {
                        console.log("Set sorters triggered.");
                    }
                });

                /*props[prop].sorters = {
                    setSorter
                }*/
            })
        )(BaseComponent);
    };
};

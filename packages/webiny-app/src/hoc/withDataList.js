// @flow
import * as React from "react";
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadList, typeDelete } from "./../actions";
import _ from "lodash";

type WithDataListParams = {
    prop?: string,
    name: string,
    type: string,
    fields: string,
    page?: number,
    perPage?: number,
    sort?: string,
    search?: JSON,
    filter?: JSON
};

const stringSortersToObject = (stringSorters: string) => {
    return stringSorters.split(",").reduce((objectSorters, currentSorter) => {
        const splat = currentSorter.split("-");
        if (splat.length > 1) {
            objectSorters[splat[1]] = -1;
        } else {
            objectSorters[splat[0]] = 1;
        }
        return objectSorters;
    }, {});
};

const objectSortersToString = (objectSorters: { [string]: number }) => {
    return Object.keys(objectSorters).reduce((stringSorters, currentSorterKey) => {
        // $FlowFixMe - we are sure that the key exists.
        const order: number = objectSorters[currentSorterKey];

        if (order !== 1) {
            stringSorters += "-";
        }

        stringSorters += currentSorterKey;

        return stringSorters;
    }, "");
};

const redirectToRouteWithQueryParams = (params: Object, props) => {
    const paramsClone = Object.assign({}, params);

    if (typeof paramsClone.sort === "object") {
        paramsClone.sort = objectSortersToString(paramsClone.sort);
    }

    const { perPage, page, sort, search } = paramsClone;

    props.router.goToRoute("current", {
        perPage,
        page,
        sort,
        search
    });
};

const prepareLoadListParams = (withDataListParams: WithDataListParams, props: Object) => {
    const paramsClone = Object.assign({}, withDataListParams);
    if (props.router) {
        const { page, perPage, sort, search } = props.router.match.query;
        Object.assign(paramsClone, {
            page,
            perPage,
            search
        });

        // Sorters in query params are listed like for example: "-createdOn,price,name,-somethingElse". We then
        // convert this syntax to plain object - {createdOn: -1, price: 1, name: 1, somethingElse: -1}.
        if (typeof sort === "string") {
            paramsClone.sort = stringSortersToObject(sort);
        }
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
const getPropKey = (params: WithDataListParams): string => params.prop || params.name;

export default (params: WithDataListParams) => {
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
                        data: _.get(state, `lists.${params.name}.data.data`, []),
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

                    delete: (id, options = {}) => {
                        const { type, fields, name } = params;
                        typeDelete({
                            type,
                            fields,
                            name,
                            id,
                            onSuccess:
                                options.onSuccess ||
                                (() => {
                                    props[prop].refresh();
                                })
                        });
                    },

                    setPerPage: (perPage: number) => {
                        const preparedParams = prepareLoadListParams(params, props);
                        preparedParams.perPage = perPage;

                        if (props.router) {
                            redirectToRouteWithQueryParams(preparedParams, props);
                            return;
                        }

                        loadList(preparedParams);
                    },

                    setPage: (page: number) => {
                        const preparedParams = prepareLoadListParams(params, props);
                        preparedParams.page = page;

                        if (props.router) {
                            redirectToRouteWithQueryParams(preparedParams, props);
                            return;
                        }

                        loadList(preparedParams);
                    },

                    setSorters: sorter => {
                        const preparedParams = prepareLoadListParams(params, props);
                        preparedParams.sort = sorter;

                        if (props.router) {
                            redirectToRouteWithQueryParams(preparedParams, props);
                            return;
                        }

                        loadList(preparedParams);
                    }
                });
            })
        )(BaseComponent);
    };
};

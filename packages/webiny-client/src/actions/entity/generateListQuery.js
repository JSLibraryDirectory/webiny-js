// @flow
import gql from "graphql-tag";
import _ from "lodash";
import pluralize from "pluralize";

type ListQueryParams = {
    entity: string,
    fields: string
};

const generateListQuery = (params: ListQueryParams) => {
    const methodName = "list" + pluralize.plural(params.entity);
    const query = gql`
            query ${_.upperFirst(
                methodName
            )}($filter: JSON, $sort: JSON, $page: Int, $perPage: Int, $search: SearchInput) {
                ${methodName}(filter: $filter, sort: $sort, page: $page, perPage: $perPage, search: $search) {
                    list {
                        ${params.fields}
                    }
                    meta {
                        count
                        totalCount
                        totalPages
                        page
                        perPage
                        from
                        to
                    }
                }
            }
        `;

    return {
        methodName,
        query
    };
};

export default generateListQuery;

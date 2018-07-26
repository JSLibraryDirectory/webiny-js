// @flow
import gql from "graphql-tag";
import pluralize from "pluralize";

type ListQueryParams = {
    type: string,
    fields: string
};

const generateListQuery = (params: ListQueryParams) => {
    console.log(params);
    const methodName = "list" + pluralize.plural(params.type);

    const query = gql`
            query listBajas($filter: JSON, $sort: JSON, $page: Int, $perPage: Int, $search: SearchInput) {
                Security {
                  Policies {
                      list(filter: $filter, sort: $sort, page: $page, perPage: $perPage, search: $search) {
                        data {
                            ${params.fields}
                        }
                        meta {
                            count
                            totalCount
                            from
                            to
                            page
                            totalPages
                            perPage
                            nextPage
                            previousPage
                        }
                    }
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

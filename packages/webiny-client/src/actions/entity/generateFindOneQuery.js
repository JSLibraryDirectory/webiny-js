// @flow
import gql from "graphql-tag";
import _ from "lodash";

type FindOneParams = {
    entity: string,
    fields: string
};
const generateListQuery = (params: FindOneParams) => {
    const methodName = "get" + params.entity;
    const query = gql`
        query ${_.upperFirst(methodName)}($id: String!) {
            ${methodName}(id: $id) {
                ${params.fields}
            }
        }
    `;

    return {
        methodName,
        query
    };
};

export default generateListQuery;

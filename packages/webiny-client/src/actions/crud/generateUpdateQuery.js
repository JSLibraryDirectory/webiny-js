// @flow
import gql from "graphql-tag";
import _ from "lodash";

type UpdateParams = {
    entity: string,
    fields: string
};

const generateUpdateQuery = (params: UpdateParams) => {
    const methodName = "update" + params.entity;

    const mutation = gql`
       mutation ${_.upperFirst(methodName)}($id: String!, $data: JSON!) {
            ${methodName}(id: $id, data: $data) {
                ${params.fields}
            }
        }
    `;

    return {
        methodName,
        mutation
    };
};

export default generateUpdateQuery;

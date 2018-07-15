// @flow
import gql from "graphql-tag";
import _ from "lodash";

type CreateParams = {
    entity: string,
    fields: string
};

const generateCreateQuery = (params: CreateParams) => {
    const methodName = "create" + params.entity;
    const mutation = gql`
        mutation ${_.upperFirst(methodName)}($data: JSON!) {
            ${methodName}(data: $data) {
                ${params.fields}
            }
        }
    `;

    return {
        methodName,
        mutation
    };
};

export default generateCreateQuery;

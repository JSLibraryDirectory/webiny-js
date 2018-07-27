// @flow
import gql from "graphql-tag";
import _ from "lodash";

type CreateParams = {
    type: string,
    fields: string
};

const generateCreateQuery = (params: CreateParams) => {
    const methodName = "create" + params.type;
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

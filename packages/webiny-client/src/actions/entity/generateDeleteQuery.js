// @flow
import gql from "graphql-tag";
import _ from "lodash";

type DeleteParams = {
    entity: string,
    fields: string
};

const generateListQuery = (params: DeleteParams) => {
    const methodName = "delete" + params.entity;
    const mutation = gql`
           mutation ${_.upperFirst(methodName)}($id: String!) {
            ${methodName}(id: $id)
        }
    `;

    return {
        methodName,
        mutation
    };
};

export default generateListQuery;

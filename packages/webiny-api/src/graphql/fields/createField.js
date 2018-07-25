// @flow
import type { GraphQLObjectType } from "graphql/type";

declare type CreateFieldConfig = {
    type: GraphQLObjectType,
    name?: string
};

export default (config: CreateFieldConfig) => {
    const { type, name } = config;
    return {
        name: name || type.name,
        type,
        resolve() {
            return type;
        }
    };
};

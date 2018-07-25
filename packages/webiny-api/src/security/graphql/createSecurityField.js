// @flow
import { GraphQLObjectType } from "graphql";
import type { Schema } from "../../graphql";

import {
    GroupType,
    GroupQueryField,
    PolicyType,
    PolicyQueryField
} from "../../entities/Entity/Entity.graphql";
import { ApiTokenType, ApiTokenQueryField } from "../../entities/ApiToken/ApiToken.graphql";
import { UserType, UserQueryField } from "../../entities/User/User.graphql";

export default (schema: Schema) => {
    // Add types to schema
    schema.addType(ApiTokenType);
    schema.addType(UserType);
    schema.addType(GroupType);
    schema.addType(PolicyType);

    // Create Security field to group security related queries
    const SecurityType = new GraphQLObjectType({
        name: "Security",
        fields: {
            ApiTokens: ApiTokenQueryField,
            Users: UserQueryField,
            Groups: GroupQueryField,
            Policies: PolicyQueryField
        }
    });

    schema.addQueryField({
        name: "Security",
        type: SecurityType,
        resolve() {
            return SecurityType;
        }
    });
};

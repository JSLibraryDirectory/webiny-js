// @flow
import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import User from "./User.entity";
import { crudFields } from "../graphql";

export const UserType = new GraphQLObjectType({
    name: "SecurityUser",
    fields: {
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gravatar: { type: GraphQLString },
        enabled: { type: GraphQLBoolean }
    }
});

export const UserQueryType = new GraphQLObjectType({
    name: "SecurityUserQuery",
    fields: {
        ...crudFields(User, UserType)
    }
});

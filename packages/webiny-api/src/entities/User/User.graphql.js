// @flow
import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLList } from "graphql";
import User from "./User.entity";
import { crudFields, createField, schema } from "../../graphql";

export const UserType = new GraphQLObjectType({
    name: "SecurityUser",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gravatar: { type: GraphQLString },
        enabled: { type: GraphQLBoolean },
        groups: { type: new GraphQLList(schema.getType("SecurityGroup")) }
    })
});

export const UserQueryType = new GraphQLObjectType({
    name: "SecurityUsers",
    fields: () => crudFields(User, schema.getType(UserType.name))
});

export const UserQueryField = () => createField(schema.getType(UserQueryType.name));

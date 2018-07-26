// @flow
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { Group, Policy } from "./Entity";
import { crudFields, createField, schema } from "../../graphql";

//  Policy graphql types and fields
export const PolicyType = new GraphQLObjectType({
    name: "SecurityPolicy",
    fields: {
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        permissions: { type: GraphQLJSON }
    }
});

export const PolicyQueryType = new GraphQLObjectType({
    name: "SecurityPolicies",
    fields: () => crudFields(Policy, schema.getType(PolicyType.name))
});

export const PolicyQueryField = () => createField(schema.getType(PolicyQueryType.name));

//  Group graphql types and fields
export const GroupType = new GraphQLObjectType({
    name: "SecurityGroup",
    fields: {
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        policies: { type: new GraphQLList(PolicyType) }
    }
});

export const GroupQueryType = new GraphQLObjectType({
    name: "SecurityGroups",
    fields: () => crudFields(Group, schema.getType(GroupType.name))
});

export const GroupQueryField = () => createField(schema.getType(GroupQueryType.name));

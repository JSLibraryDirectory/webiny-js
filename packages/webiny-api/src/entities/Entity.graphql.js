// @flow
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { Group, Policy } from "./Entity";
import { crudFields } from "../graphql";

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
    name: "SecurityPolicyQuery",
    fields: crudFields(Policy, PolicyType)
});

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
    name: "SecurityGroupQuery",
    fields: crudFields(Group, GroupType)
});

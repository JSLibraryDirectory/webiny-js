// @flow
import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { Group, Policy } from "./Entity";
import { crudFields, createField } from "../../graphql";

export const PolicyType = new GraphQLObjectType({
    name: "SecurityPolicy",
    fields: {
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        permissions: { type: GraphQLJSON }
    }
});

const PolicyQueryType = new GraphQLObjectType({
    name: "SecurityPolicies",
    fields: crudFields(Policy, PolicyType)
});

export const PolicyQueryField = createField({ type: PolicyQueryType });

export const GroupType = new GraphQLObjectType({
    name: "SecurityGroup",
    fields: {
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        description: { type: GraphQLString },
        policies: { type: new GraphQLList(PolicyType) }
    }
});

const GroupQueryType = new GraphQLObjectType({
    name: "SecurityGroups",
    fields: crudFields(Group, GroupType)
});

export const GroupQueryField = createField({ type: GroupQueryType });

// @flow
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from "graphql";
import { crudFields } from "../graphql";
import File from "./File.entity";

export const FileType = new GraphQLObjectType({
    name: "File",
    fields: {
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        ext: { type: GraphQLString },
        key: { type: GraphQLString },
        src: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        order: { type: GraphQLInt }
    }
});

export const FileQueryType = new GraphQLObjectType({
    name: "FileQuery",
    fields: crudFields(File, FileType)
});

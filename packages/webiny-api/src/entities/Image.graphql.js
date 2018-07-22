// @flow
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
    GraphQLBoolean
} from "graphql";

import { crudFields } from "../graphql";
import Image from "./Image.entity";

export const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: {
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        ext: { type: GraphQLString },
        key: { type: GraphQLString },
        src: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        order: { type: GraphQLInt },
        preset: { type: GraphQLString },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt },
        aspectRatio: { type: GraphQLFloat },
        isPortrait: { type: GraphQLBoolean },
        isLandscape: { type: GraphQLBoolean }
    }
});

export const ImageQueryType = new GraphQLObjectType({
    name: "ImageQuery",
    fields: {
        ...crudFields(Image, ImageType)
    }
});

// @flow
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } from "graphql";
import GraphQLJSON from "graphql-type-json";
import type { Api } from "../..";
import { getEntityClasses } from "../../entities";

export default (api: Api, config: Object, schema: Object) => {
    schema.addType(
        new GraphQLObjectType({
            name: "EntityAttributesAttribute",
            fields: {
                name: { type: GraphQLString },
                protected: { type: GraphQLBoolean }
            }
        })
    );

    schema.addType(
        new GraphQLObjectType({
            name: "EntityAttributes",
            fields: () => ({
                name: { type: GraphQLString },
                classId: { type: GraphQLString },
                attributes: { type: new GraphQLList(schema.types["EntityAttributesAttribute"]) },
                permissions: { type: GraphQLJSON }
            })
        })
    );

    schema.addQuery(
        new GraphQLObjectType({
            name: "System",
            fields: {
                entities: {
                    description: "Returns a list of all registered entities and its attributes.",
                    type: new GraphQLObjectType({
                        name: "EntitiesListType",
                        fields: () => ({
                            list: { type: new GraphQLList(schema.getType("EntityAttributes")) },
                            meta: {
                                type: new GraphQLObjectType({
                                    name: "listMeta",
                                    fields: {
                                        count: { type: GraphQLInt },
                                        totalCount: { type: GraphQLInt },
                                        totalPages: { type: GraphQLInt }
                                    }
                                })
                            }
                        })
                    }),
                    async resolve() {
                        const list = getEntityClasses().map(entityClass => {
                            return entityClass.describe();
                        });

                        return {
                            list,
                            meta: {
                                totalCount: list.length,
                                totalPages: 1,
                                count: list.length
                            }
                        };
                    }
                }
            }
        })
    );
};

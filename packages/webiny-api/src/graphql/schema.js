// @flow
import { GraphQLObjectType, GraphQLInputObjectType, GraphQLSchema } from "graphql";

export class Schema {
    query: Object;
    mutation: Object;
    types: Object;
    schema: GraphQLSchema;

    constructor() {
        this.query = {};
        this.mutation = {};
        this.types = {};
    }

    addType(type: GraphQLObjectType | GraphQLInputObjectType) {
        this.types[type.name] = type;
    }

    getType(type: string) {
        if (!this.types[type]) {
            throw Error(`Type not found: ${type}`);
        }
        return this.types[type];
    }

    addQueryField(field: Object) {
        this.query[field.name] = field;
    }

    getQueryField(field: string) {
        if (!this.query[field]) {
            throw Error(`Query not found: ${field}`);
        }
        return this.query[field];
    }

    addMutationField(type: GraphQLObjectType) {
        this.mutation[type.name] = { type };
    }

    getGraphQLSchema() {
        if (!this.schema) {
            let mutation = null;
            if (Object.keys(this.mutation).length) {
                mutation = new GraphQLObjectType({
                    name: "Mutation",
                    fields: this.mutation
                });
            }

            this.schema = new GraphQLSchema({
                query: new GraphQLObjectType({
                    name: "Query",
                    fields: this.query
                }),
                mutation
            });
        }

        return this.schema;
    }
}

export default new Schema();

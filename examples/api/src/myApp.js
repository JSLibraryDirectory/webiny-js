import { GraphQLString } from "graphql";
import { schema } from "webiny-api/graphql";

export default () => {
    return {
        init({ api }, next) {
            schema.extend("SecurityApiTokens", fields => {
                return {
                    ...fields,
                    invalidate: {
                        type: GraphQLString,
                        description: "Added by MyApp to invalidate tokens.",
                        resolve() {
                            return "Token has been invalidated!";
                        }
                    }
                };
            });

            next();
        }
    };
};

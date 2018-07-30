// @flow
import get from "lodash/get";
import { SecurityService } from "./services";
import { registerEntity, Entity } from "./entities";
import { schema } from "./graphql";
import createLoginQueries from "./security/graphql/createLoginQueries";
import createSystemQuery from "./security/graphql/createSystemQuery";
import createIdentityQuery from "./security/graphql/createIdentityQuery";
import createSecurityField from "./security/graphql/createSecurityField";

// Entities and GraphQL types
import { Group, Groups2Entities, Policies2Entities, Policy } from "./entities/Entity/Entity";
import ApiToken from "./entities/ApiToken/ApiToken.entity";
import File from "./entities/File/File.entity";
import { FileType, FileQueryType, FileQueryField } from "./entities/File/File.graphql";
import Image from "./entities/Image/Image.entity";
import { ImageType, ImageQueryType, ImageQueryField } from "./entities/Image/Image.graphql";
import User from "./entities/User/User.entity";

// Attributes registration functions
import registerBufferAttribute from "./attributes/registerBufferAttribute";
import registerPasswordAttribute from "./attributes/registerPasswordAttribute";
import registerIdentityAttribute from "./attributes/registerIdentityAttribute";
import registerFileAttributes from "./attributes/registerFileAttributes";
import registerImageAttributes from "./attributes/registerImageAttributes";

/**
 * This app will always be initialized first. That's why we are assigning configurations,
 * checking the database connection and project installation here.
 */
export default () => {
    return {
        /**
         * We configure and test the received params here.
         * @param params
         * @param next
         * @returns {Promise<*>}
         */
        async configure(params: Object, next: Function) {
            const { api } = params;

            // Configure Entity layer
            if (api.config.entity) {
                // Register Entity driver
                Entity.driver = api.config.entity.driver;

                registerBufferAttribute();
                registerPasswordAttribute();
                registerIdentityAttribute();

                // Register attributes
                api.config.entity.attributes &&
                    api.config.entity.attributes({
                        fileAttributes: registerFileAttributes,
                        imageAttributes: registerImageAttributes
                    });
            }

            api.services.register("security", () => {
                return new SecurityService(api.config.security);
            });

            // Check if connection is valid and if Settings table exists - this will tell us if the system is installed.
            if (process.env.NODE_ENV === "development") {
                try {
                    await Entity.getDriver().test();
                } catch (e) {
                    throw Error(
                        `The following error occurred while initializing Entity driver: "${
                            e.message
                        }". Did you enter the correct database information?`
                    );
                }

                if (process.env.INSTALL === "true") {
                    return next();
                }

                let defaultGroup = null;
                try {
                    defaultGroup = await Group.getDefaultGroup();
                } catch (e) {
                    // Do nothing, this is just in case the driver throws an error because of the missing table.
                } finally {
                    // If default group was not found, that means system is not installed, and we have to install
                    // it in the next steps.
                    if (!defaultGroup) {
                        process.env.INSTALL = "true";
                    }
                }
            }

            next();
        },

        /**
         * Will be executed if the install flag is set to true (prepares database).
         * @param params
         * @param next
         * @returns {Promise<void>}
         */
        async install(params: Object, next: Function) {
            const { default: install } = await import("./install");
            await install();
            next();
        },

        /**
         *
         * @param params
         * @param next
         * @returns {Promise<void>}
         */
        async init(params: Object, next: Function) {
            const { api } = params;

            // If we are in the install process, we don't need to initialize security just yet. Let's first allow
            // all apps to be installed, and then do the initialization in the "postInstall" lifecycle event.
            const security = api.services.get("security");
            if (!security.initialized) {
                await security.init();
            }

            if (get(api.config, "graphql.defaultFields", true) !== false) {
                schema.addType(FileType);
                schema.addType(FileQueryType);
                schema.addType(ImageType);
                schema.addType(ImageQueryType);
                schema.addQueryField(FileQueryField());
                schema.addQueryField(ImageQueryField());

                createSecurityField(schema);
                createIdentityQuery(api, api.config, schema);
                createLoginQueries(api, api.config, schema);
                createSystemQuery(api, api.config, schema);
            }

            registerEntity(ApiToken);
            registerEntity(File);
            registerEntity(Image);
            registerEntity(User);
            registerEntity(Group);
            registerEntity(Groups2Entities);
            registerEntity(Policy);
            registerEntity(Policies2Entities);

            next();
        }
    };
};

// @flow
import { registerEntity } from "webiny-api/entities";

import Page from "./entities/Page.entity";
import Revision from "./entities/Revision.entity";
import Category from "./entities/Category.entity";

export default () => {
    return {
        async install(params: Object, next: Function) {
            const { default: install } = await import("./install");
            await install();

            next();
        },

        init(params: Object, next: Function) {
            registerEntity(Page);
            registerEntity(Category);
            registerEntity(Revision);

            next();
        }
    };
};

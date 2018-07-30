import config from "./../configs";
import { api } from "webiny-api";
import myApp from "./../myApp";

module.exports = () => {
    api.configure(config())
        .use(myApp())
        .install();
};

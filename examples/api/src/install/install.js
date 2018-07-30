module.exports = () => {
    const config = require("./../configs");
    const { api } = require("webiny-api");
    const { default: myApp } = require("./../myApp");

    api.configure(config())
        .use(myApp())
        .install();
};

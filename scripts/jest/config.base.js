// @flow
const packages = require("./../utils/listPackages")([
    // Append untested libraries to the blacklist - they are all work in progress.
    "webiny-api",
    "webiny-api-cms",
    "webiny-app",
    "webiny-app-admin",
    "webiny-app-cms",
    "webiny-ui",
    "webiny-form",
    "webiny-i18n-react",
    "webiny-react-router"
]);

module.exports = {
    setupTestFrameworkScriptFile: "jest-extended",
    transformIgnorePatterns: ["<rootDir>/build/", "node_modules"],
    rootDir: process.cwd(),
    testRegex: `packages/(${packages.join("|")})/.*test.js$`,

    // "collectCoverageFrom" - transform "*.js" to "*.{js,jsx}" when ready.
    collectCoverageFrom: [`packages/{${packages.join(",")}}/src/**/*.js`],
    coverageReporters: ["lcov", "html"],
    testEnvironment: "node"
};

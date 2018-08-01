// @flow
import compose from "webiny-compose";
import debugFactory from "debug";
import { Security } from "./../security";
import { redux } from "./../redux";
import GraphQLClient from "./../graphql/Client";

const debug = debugFactory("webiny-app");

declare type Configurator = (app: App) => Promise<void>;
declare type ConfigLoader = () => Promise<Object>;

class App {
    config: Object;
    configurators: Array<Configurator>;
    configLoaders: Array<ConfigLoader>;
    security: Security;
    initialized: boolean;
    graphql: GraphQLClient;

    constructor() {
        this.config = {};
        this.configurators = [];
        this.security = new Security();
        this.graphql = new GraphQLClient();
        this.initialized = false;
        this.configLoaders = [];
    }

    use(configurator: Configurator) {
        this.configurators.push(configurator);
    }

    configure(configLoader: ConfigLoader) {
        this.configLoaders.push(configLoader);
    }

    async setup() {
        debug("Started setup");
        for (let i = 0; i < this.configLoaders.length; i++) {
            await this.configLoaders[i](this.config);
        }

        await compose(this.configurators)({ app: this });
        this.initialized = true;
        debug("Finished setup");
        return { store: redux.initStore() };
    }
}

export default App;

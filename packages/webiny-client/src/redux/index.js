// @flow
import { applyMiddleware, createStore, compose } from "redux";
// import logger from "redux-logger";
import _ from "lodash";

const wrapReducer = (type, selector, reducer) => {
    return (state, action) => {
        if (action.type === type) {
            let stateKey = selector;
            if (typeof selector === "function") {
                stateKey = selector({ action });
            }

            const subState = _.cloneDeep(stateKey ? _.get(state, stateKey) : state);
            const result = reducer({ state: subState, root: state, action });
            state = stateKey ? _.set(_.cloneDeep(state), stateKey, result) : _.cloneDeep(result);
        }

        return state;
    };
};

const wrapMiddleware = (type, middleware) => {
    return store => next => action => {
        if (action.type === type) {
            middleware({ store, next, action: _.cloneDeep(action) });
        } else {
            next(action);
        }
    };
};

class App {
    store;
    middleware = [];
    reducers = [];

    rootReducer = (INIT_STATE = {}) => {
        return (state = INIT_STATE, action) => {
            this.reducers.forEach(reducer => {
                state = reducer(state, action);
            });

            return state;
        };
    };

    on(type, options = {}) {
        const { selector = null, reducer = null, middleware = null } = options;

        if (reducer) {
            this.reducers.push(wrapReducer(type, selector, reducer));
        }

        if (middleware) {
            this.middleware.push(wrapMiddleware(type, middleware));
        }
    }

    action(type, options = {}) {
        const { selector = null, reducer = state => state, middleware = null } = options;

        if (selector && reducer) {
            this.reducers.push(wrapReducer(type, selector, reducer));
        }

        if (middleware) {
            this.middleware.push(wrapMiddleware(type, middleware));
        }

        const action = { type };
        return (payload = {}) => {
            this.store.dispatch({ ...action, payload });
        };
    }

    initStore(INIT_STATE = {}, middleware = []) {
        // dev tool
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        this.store = createStore(
            this.rootReducer(INIT_STATE),
            composeEnhancers(applyMiddleware(/*logger, */ ...middleware, ...this.middleware))
        );

        return this.store;
    }
}

export default new App();

export const redux = new App();

export const createAction = (type, config) => {
    return redux.action(type, config);
};

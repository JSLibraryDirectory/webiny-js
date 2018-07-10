import { applyMiddleware, createStore, compose } from "redux";
import _ from "lodash";

const wrapReducer = (type, key, reducer) => {
    return (state, action) => {
        if (action.type === type) {
            const subState = _.cloneDeep(key ? _.get(state, key) : state);
            const result = reducer({ state: subState, root: state, action });
            state = key ? _.setWith(_.cloneDeep(state), key, result, _.clone) : _.cloneDeep(result);
        }

        return state;
    };
};

const wrapMiddleware = (type, middleware) => {
    return store => next => action => {
        if (action.type === type) {
            middleware({ store, next, action });
        } else {
            next(action);
        }
    };
};

class Redux {
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
        const { key = null, reducer = null, middleware = null } = options;

        if (reducer) {
            this.reducers.push(wrapReducer(type, key, reducer));
        }

        if (middleware) {
            this.middleware.push(wrapMiddleware(type, middleware));
        }
    }

    action(type, options = {}) {
        const {
            key = null,
            reducer = state => state,
            middleware = null
        } = options;

        if (key && reducer) {
            this.reducers.push(wrapReducer(type, key, reducer));
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
            composeEnhancers(applyMiddleware(...middleware, ...this.middleware))
        );

        return this.store;
    }
}

export const redux = new Redux();

export const createAction = (type, config) => {
    return redux.action(type, config);
};

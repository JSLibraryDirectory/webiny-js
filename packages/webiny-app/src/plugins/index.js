// @flow
const plugins = {};

export const addPlugin = (...args) => {
    args.forEach(pl => {
        plugins[pl.name] = pl;
    });
};

export const getPlugins = type => {
    return Object.values(plugins).filter(pl => pl.type === type);
};

export const getPlugin = name => {
    return plugins[name];
};

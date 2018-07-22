// @flow
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadForm, submitForm, resetForm } from "./../actions";
import _ from "lodash";

type WithFormParams = {
    name: string,
    entity: string,
    fields: string,
    id: string,
    prop?: string
};

/**
 * All list data is passed into child components via specific prop. Be default, "name" parameter will be
 * used to determine its name. Alternatively, "prop" parameter can be used to specify a different name.
 * @param params
 * @returns {*}
 */
const getPropKey = (params: WithFormParams): string => params.prop || params.name;

// TODO: return type must be more precise.
export default (params: WithFormParams): Function => {
    return BaseComponent => {
        return compose(
            connect(state => {
                const prop = getPropKey(params);
                return { [prop]: _.get(state, `forms.${params.name}`, {}) };
            }),
            lifecycle({
                componentDidMount() {
                    params.id && loadForm(params);
                }
            }),
            withProps(props => {
                const prop = getPropKey(params);
                Object.assign(props[prop], {
                    submit: ({ data }) => {
                        submitForm({ ...params, ...data });
                    },
                    reset: () => {
                        resetForm(params);
                    }
                });
            })
        )(BaseComponent);
    };
};

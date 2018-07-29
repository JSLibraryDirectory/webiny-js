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

const prepareLoadFormParams = (withDataFormParams: WithFormParams, props: Object) => {
    const paramsClone = Object.assign({}, withDataFormParams);
    if (props.router) {
        const { id } = props.router.match.params;
        if (id) {
            paramsClone.id = id;
        }
    } else {
        // TODO: Assign from store.
    }

    return paramsClone;
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
                    const preparedParams = prepareLoadFormParams(params, this.props);
                    preparedParams.id && loadForm(preparedParams);
                }
            }),
            withProps(props => {
                const prop = getPropKey(params);
                Object.assign(props[prop], {
                    submit: ({ data }) => {
                        submitForm({ ...params, data });
                    },
                    reset: () => {
                        resetForm(params);
                    }
                });
            })
        )(BaseComponent);
    };
};

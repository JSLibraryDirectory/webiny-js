// @flow
import { connect } from "react-redux";
import { compose, lifecycle, withProps } from "recompose";
import { loadForm, submitForm, resetForm } from "./../actions";
import _ from "lodash";

type WithFormParams = {
    name: string,
    entity: string,
    fields: string,
    id: string
};

// TODO: return type must be more precise.
export default ({ name, entity, fields, id }: WithFormParams): Function => {
    return BaseComponent => {
        return compose(
            connect(state => {
                return { form: _.get(state, `forms.${name}`, {}) };
            }),
            lifecycle({
                componentDidMount() {
                    id &&
                        loadForm({
                            id,
                            name,
                            entity,
                            fields
                        });
                }
            }),
            withProps(props => {
                props.form.submit = ({ data }) => {
                    submitForm({
                        data,
                        name,
                        entity,
                        fields
                    });
                };

                props.form.reset = () => {
                    resetForm({ name });
                };
            })
        )(BaseComponent);
    };
};

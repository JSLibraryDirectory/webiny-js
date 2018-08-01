// @flow
import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";
import { withTopProgressBar } from "webiny-ui-material/TopProgressBar/hoc";
import _ from "lodash";

const TopProgressBar = () => null;

export default compose(
    connect(state => ({
        graphql: state.graphql
    })),
    withTopProgressBar(),
    lifecycle({
        componentWillReceiveProps(props) {
            const graphQlOperations = {
                current: _.get(this.props, "graphql.activeOperationsCount"),
                next: _.get(props, "graphql.activeOperationsCount")
            };

            if (graphQlOperations.current === 0 && graphQlOperations.next > 0) {
                props.startTopProgressBar();
            }

            if (graphQlOperations.current > 0 && graphQlOperations.next === 0) {
                props.finishTopProgressBar();
            }
        }
    })
)(TopProgressBar);

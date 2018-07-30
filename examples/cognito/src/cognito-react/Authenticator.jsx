import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./debug";

class Authenticator extends React.Component {
    state = {
        user: null,
        auth: this.props.authState || "signIn"
    };

    componentWillMount() {
        const config = this.props.config;
        if (config) {
            Auth.configure(config);
        }
    }

    componentDidMount() {
        this.checkUser();
    }

    async checkUser() {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const state = user ? "signedIn" : "signIn";
            this.setState({ user });
            this.onChangeState(state, user);
        } catch (e) {
            debug("Error %s", e);
        }
    }

    onChangeState = (state, data) => {
        debug("authenticator state change %o", state, data || "");
        if (state === this.state.auth) {
            return;
        }

        if (state === "signedOut") {
            state = "signIn";
        }

        this.setState(current => {
            return {
                auth: state,
                authData: data,
                error: null,
                user: state === "signedIn" && data ? data : current.user
            };
        });

        if (this.props.onStateChange) {
            this.props.onStateChange(state, data);
        }
    };

    render() {
        const { auth, user, authData } = this.state;

        return this.props.children({
            authProps: {
                user,
                authState: auth,
                authData,
                changeState: this.onChangeState
            }
        });
    }
}

export default Authenticator;

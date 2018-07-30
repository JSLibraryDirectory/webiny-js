import React from "react";
import { ButtonPrimary, ButtonDefault } from "webiny-client-ui-material/Button";
import Auth from "@aws-amplify/auth";

class Profile extends React.Component {
    authStates = ["signedIn"];

    signOut = async () => {
        await Auth.signOut();
        this.props.changeState("signedOut")
    };

    render() {
        const { authState, authData, user } = this.props;
        if (!this.authStates.includes(authState)) {
            return null;
        }

        return (
            <React.Fragment>
                <h2>Welcome, {user.username}</h2>
                <ButtonDefault onClick={() => this.signOut()}>
                    Logout
                </ButtonDefault>
                <ButtonPrimary onClick={() => this.props.changeState("setupMFA")}>
                    Setup MFA
                </ButtonPrimary>
            </React.Fragment>
        );
    }
}

export default Profile;

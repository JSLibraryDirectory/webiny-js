import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./../debug";
import { Form } from "webiny-form";
import { Grid, Cell } from "webiny-ui/Grid";
import { ButtonPrimary, ButtonDefault } from "webiny-ui/Button";
import { Input } from "webiny-ui/Input";

class ConfirmSignIn extends React.Component {
    authStates = ["confirmSignIn"];

    state = {
        resent: false,
        error: null
    };

    usernameFromAuthData = () => {
        const { user } = this.props;
        if (!user) {
            return "";
        }

        let username = "";
        if (typeof user === "object") {
            username = user.user ? user.user.username : user.username;
        } else {
            username = user;
        }

        return username;
    };

    confirm = async ({ code }) => {
        try {
            const user = await Auth.confirmSignIn(this.props.authData, code, this.props.authData.challengeName);
            this.props.changeState("signedIn", user);
        } catch (e) {
            console.error(e);
            this.setState({ error: e.message });
        }
    };

    resend = async () => {
        const username = this.usernameFromAuthData();
        try {
            await Auth.resendSignUp(username);
            this.setState({ resent: true });
        } catch (e) {
            console.error(e);
            this.setState({ error: e.message });
        }
    };

    renderDefault = () => {
        return (
            <React.Fragment>
                <Form onSubmit={data => this.confirm(data)}>
                    {({ submit, Bind }) => (
                        <Grid>
                            <Cell span={12}>
                                {this.state.error && (
                                    <div style={{ color: "red" }}>{this.state.error}</div>
                                )}
                                <Bind name={"code"} validators={["required"]}>
                                    <Input label={"Confirmation code"} />
                                </Bind>
                            </Cell>
                            <Cell span={6}>
                                {this.props.authData.challengeName !== "SOFTWARE_TOKEN_MFA" && (
                                    <ButtonDefault onClick={() => this.resend()}>
                                        Resend code
                                    </ButtonDefault>
                                )}
                            </Cell>
                            <Cell span={6}>
                                <ButtonPrimary onClick={submit}>Confirm</ButtonPrimary>
                            </Cell>
                        </Grid>
                    )}
                </Form>
            </React.Fragment>
        );
    };

    render() {
        const { authState, authData, children, changeState } = this.props;
        if (!this.authStates.includes(authState)) {
            return null;
        }

        return children
            ? children({
                  authData,
                  confirmSignIn: this.confirm,
                  resendCode: this.resend,
                  changeState,
                  resent: this.state.resent
              })
            : this.renderDefault();
    }
}

export default ConfirmSignIn;

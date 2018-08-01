import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./../debug";
import { Form } from "webiny-form";
import { Grid, Cell } from "webiny-ui/Grid";
import { ButtonPrimary, ButtonDefault } from "webiny-ui/Button";
import { Input } from "webiny-ui/Input";

class SignIn extends React.Component {
    authStates = ["signIn", "signedOut", "signedUp"];

    signIn = data => {
        const { username, password } = data;

        Auth.signIn(username, password)
            .then(user => {
                debug("User %O", user);
                if (
                    user.challengeName === "SMS_MFA" ||
                    user.challengeName === "SOFTWARE_TOKEN_MFA"
                ) {
                    debug("confirm user with %s" + user.challengeName);
                    this.props.changeState("confirmSignIn", user);
                } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                    debug("require new password %s", user.challengeParam);
                    this.props.changeState("requireNewPassword %O", user);
                } else if (user.challengeName === "MFA_SETUP") {
                    debug("TOTP setup %s", user.challengeParam);
                    this.props.changeState("TOTPSetup", user);
                } else {
                    this.checkContact(user);
                }
            })
            .catch(err => {
                if (err.code === "UserNotConfirmedException") {
                    debug("the user is not confirmed");
                    this.props.changeState("confirmSignUp", username);
                } else {
                    console.log(err);
                }
            });
    };

    checkContact = async user => {
        const data = await Auth.verifiedContact(user);
        if (data.verified) {
            this.props.changeState("signedIn", user);
        } else {
            user = Object.assign(user, data);
            this.props.changeState("verifyContact", user);
        }
    };

    renderDefault = () => {
        return (
            <React.Fragment>
                <Form onSubmit={data => this.signIn(data)}>
                    {({ submit, Bind }) => (
                        <Grid>
                            <Cell span={12}>
                                <Bind name={"username"} validators={["required"]}>
                                    <Input label={"Username"} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={"password"} validators={["required"]}>
                                    <Input type="password" label={"Password"} />
                                </Bind>
                            </Cell>
                            <Cell span={3}>
                                <ButtonDefault
                                    onClick={() => this.props.changeState("signUp")}
                                >
                                    Sign Up
                                </ButtonDefault>
                            </Cell>
                            <Cell span={6}>
                                <ButtonDefault
                                    onClick={() => this.props.changeState("forgotPassword")}
                                >
                                    Forgot password?
                                </ButtonDefault>
                            </Cell>

                            <Cell span={3}>
                                <ButtonPrimary onClick={submit}>Sign In</ButtonPrimary>
                            </Cell>
                        </Grid>
                    )}
                </Form>
            </React.Fragment>
        );
    };

    render() {
        const { authState, children, changeState } = this.props;
        if (!this.authStates.includes(authState)) {
            return null;
        }

        return children ? children({ signIn: this.signIn, changeState }) : this.renderDefault();
    }
}

export default SignIn;

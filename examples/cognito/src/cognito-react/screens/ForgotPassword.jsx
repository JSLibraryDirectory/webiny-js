import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./../debug";

import { Form } from "webiny-form";
import { ButtonPrimary } from "webiny-ui/Button";
import { Input } from "webiny-ui/Input";
import { Grid, Cell } from "webiny-ui/Grid";

class ForgotPassword extends React.Component {
    authStates = ["forgotPassword"];

    state = {
        username: null,
        delivery: null,
        error: null,
        progress: false // TODO: Add loading overlay
    };

    requestCode = async data => {
        const { username } = data;
        this.setState({ username });
        const res = await Auth.forgotPassword(username);
        debug("Forgot password %O", res);
        this.setState({ delivery: res.CodeDeliveryDetails });
    };

    setPassword = async data => {
        const { code, password } = data;

        try {
            await Auth.forgotPasswordSubmit(this.state.username, code, password);
            this.props.changeState("signIn");
            this.setState({ delivery: null, username: null });
        } catch (e) {
            this.setState({ error: e.getMessage() });
        }
    };

    renderDefault = () => {
        if (this.state.delivery) {
            return (
                <React.Fragment>
                    <span>
                        A verification code was sent to{" "}
                        <strong>{this.state.delivery.Destination}</strong>
                    </span>
                    <Form onSubmit={data => this.setPassword(data)}>
                        {({ submit, Bind }) => (
                            <Grid>
                                <Cell span={12}>
                                    <Bind name={"code"}>
                                        <Input label={"Verification code"} />
                                    </Bind>
                                </Cell>
                                <Cell span={12}>
                                    <Bind name={"password"}>
                                        <Input type="password" label={"New password"} />
                                    </Bind>
                                </Cell>
                                <Cell span={6} />
                                <Cell span={6}>
                                    <ButtonPrimary onClick={submit}>Reset password</ButtonPrimary>
                                </Cell>
                            </Grid>
                        )}
                    </Form>
                </React.Fragment>
            );
        }

        return (
            <Form onSubmit={data => this.requestCode(data)}>
                {({ submit, Bind }) => (
                    <Grid>
                        <Cell span={12}>
                            <Bind name={"username"}>
                                <Input label={"Username"} />
                            </Bind>
                        </Cell>
                        <Cell span={6} />
                        <Cell span={6}>
                            <ButtonPrimary onClick={submit}>Request password reset</ButtonPrimary>
                        </Cell>
                    </Grid>
                )}
            </Form>
        );
    };

    render() {
        const { authState, children } = this.props;
        if (!this.authStates.includes(authState)) {
            return null;
        }

        return children
            ? children({
                  requestCode: this.requestCode,
                  setPassword: this.setPassword,
                  delivery: this.state.delivery,
                  username: this.state.username
              })
            : this.renderDefault();
    }
}

export default ForgotPassword;

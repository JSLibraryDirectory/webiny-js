import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./../debug";
import { Form } from "webiny-form";
import { Grid, Cell } from "webiny-ui/Grid";
import { ButtonPrimary, ButtonDefault } from "webiny-ui/Button";
import { Input } from "webiny-ui/Input";

class SignIn extends React.Component {
    authStates = ["signUp"];

    signUp = async data => {
        const { username, password, phone_number } = data;
        try {
            const res = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: username,
                    phone_number
                }
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }

        this.props.changeState("confirmSignUp", username);
    };

    renderDefault = () => {
        return (
            <React.Fragment>
                <Form onSubmit={data => this.signUp(data)}>
                    {({ submit, Bind }) => (
                        <Grid>
                            <Cell span={12}>
                                <Bind name={"username"} validators={["required", "email"]}>
                                    <Input label={"Email"} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={"password"} validators={["required"]}>
                                    <Input type="password" label={"Password"} />
                                </Bind>
                            </Cell>
                            <Cell span={12}>
                                <Bind name={"phone_number"} validators={["phone"]}>
                                    <Input label={"Phone number"} />
                                </Bind>
                            </Cell>
                            <Cell span={6}>
                                <ButtonDefault onClick={() => this.props.changeState("signIn")}>
                                    Back
                                </ButtonDefault>
                            </Cell>
                            <Cell span={6}>
                                <ButtonPrimary onClick={submit}>Sign Up</ButtonPrimary>
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

        return children ? children({ signUp: this.signUp, changeState }) : this.renderDefault();
    }
}

export default SignIn;

import React from "react";
import Auth from "@aws-amplify/auth";
import debug from "./../debug";
import QRCode from "qrcode.react";
import { Form } from "webiny-form";
import { Grid, Cell } from "webiny-ui/Grid";
import { ButtonPrimary, ButtonDefault } from "webiny-ui/Button";
import { Input } from "webiny-ui/Input";
import Radio from "webiny-ui/Radio";

class SetupMFA extends React.Component {
    authStates = ["setupMFA"];

    state = {
        type: null,
        message: null,
        setupTOTP: false,
        totpCode: null
    };

    activate = async ({ method }) => {
        const { user } = this.props;

        this.setState({ type: method });

        try {
            const data = await Auth.setPreferredMFA(user, method);
            debug("Set preferred mfa success %O", data);
            this.setState({
                message: "Success! Now you have changed to MFA Type: " + method
            });
        } catch (e) {
            console.log(e);
            const { message } = e;
            if (
                message === "User has not set up software token mfa" ||
                message === "User has not verified software token mfa"
            ) {
                try {
                    const data = await Auth.setupTOTP(user);
                    debug("secret key", data);
                    const code =
                        "otpauth://totp/AWSCognito:" +
                        user.username +
                        "?secret=" +
                        data +
                        "&issuer=AWSCognito";
                    this.setState({ code, setupTOTP: true });
                } catch (e) {
                    console.error(e);
                }
            } else {
                this.setState({ message: "You cannot select MFA Type for now!" });
            }
        }
    };

    verifyTOTPCode = async ({ code }) => {
        const { user } = this.props;

        try {
            await Auth.verifyTotpToken(user, code);
            // set it to preferred mfa
            Auth.setPreferredMFA(user, "TOTP");
            this.setState({ message: "TOTP was enabled successfully!" });
            debug("set up totp success!");
        } catch (e) {
            console.error(e);
            this.setState({ message: "TOTP setup failed!" });
        }
    };

    renderMFASelector = () => {
        const options = [
            { id: "TOTP", name: "TOTP" },
            { id: "SMS", name: "SMS" },
            { id: "NOMFA", name: "None" }
        ];

        return (
            <Form onSubmit={data => this.activate(data)}>
                {({ submit, Bind }) => (
                    <Grid>
                        <Cell span={12}>
                            <Bind name="method">
                                <Radio.Group label="MFA type">
                                    {({ onChange, getValue }) => (
                                        <React.Fragment>
                                            {options.map(({ id, name }) => (
                                                <Radio
                                                    key={id}
                                                    label={name}
                                                    value={getValue(id)}
                                                    onChange={onChange(id)}
                                                />
                                            ))}
                                        </React.Fragment>
                                    )}
                                </Radio.Group>
                            </Bind>
                        </Cell>
                        <Cell span={6}>
                            <ButtonDefault onClick={() => this.props.changeState("profile")}>
                                Back
                            </ButtonDefault>
                        </Cell>
                        <Cell span={6}>
                            <ButtonPrimary onClick={submit}>Activate</ButtonPrimary>
                        </Cell>
                    </Grid>
                )}
            </Form>
        );
    };

    renderSetupTOTP = () => {
        return (
            <Form onSubmit={data => this.verifyTOTPCode(data)}>
                {({ submit, Bind }) => (
                    <Grid>
                        <Cell span={12}>
                            <QRCode value={this.state.code} />
                        </Cell>
                        <Cell span={12}>
                            <Bind name={"code"} validators={["required"]}>
                                <Input autoFocus label={"Verification code"} />
                            </Bind>
                        </Cell>
                        <Cell span={6}>
                            <ButtonDefault
                                onClick={() => this.setState({ setupTOTP: false, totpCode: null })}
                            >
                                Cancel
                            </ButtonDefault>
                        </Cell>
                        <Cell span={6}>
                            <ButtonPrimary onClick={submit}>Verify code</ButtonPrimary>
                        </Cell>
                    </Grid>
                )}
            </Form>
        );
    };

    render() {
        const { authState } = this.props;
        if (!this.authStates.includes(authState)) {
            return null;
        }

        return (
            <React.Fragment>
                {this.state.message && <div>{this.state.message}</div>}
                {this.state.setupTOTP && this.renderSetupTOTP()}
                {!this.state.setupTOTP && this.renderMFASelector()}
            </React.Fragment>
        );
    }
}

export default SetupMFA;

// @flow
import React from "react";
import classSet from "classnames";
import invariant from "invariant";
import { app, inject, i18n } from "webiny-client";
import logoOrange from "webiny-client-admin-material/assets/images/logo_orange.png";

import { submitLogin } from "../actions";

import { Elevation } from "rmwc/Elevation";
import Button from "webiny-client-ui-material/Button";
import Input from "webiny-client-ui-material/Input";
import { Grid, GridCell } from "rmwc/Grid";

const t = i18n.namespace("Webiny.Admin.Auth.Login");

@inject({
    modules: ["Form", "Input", "Password", "Button", "Email", "Loader", "Alert"]
})
class Login extends React.Component {
    constructor(props) {
        super(props);

        invariant(props.identity, `You must specify an "identity" prop!`);
        invariant(props.strategy, `You must specify a "strategy" prop!`);

        this.state = {
            twoFactorAuth: false,
            verificationToken: null,
            loading: false,
            error: null
        };
    }

    render() {
        const { Form } = this.props.modules;
        return (
            <div style={{ backgroundColor: "white", maxWidth: 500, margin: "0 auto" }}>
                <Form onSubmit={model => this.props.onSubmit.call(this, model)}>
                    {({ form, Bind }) => (
                        <Elevation z={2}>
                            <Grid>
                                <GridCell span="12">
                                    <h2>{t`Login`}</h2>
                                </GridCell>
                            </Grid>

                            <Grid>
                                <GridCell span="12">
                                    <Bind name="username" validators={["required", "email"]}>
                                        <Input
                                            placeholder={t`Enter e-mail`}
                                            fullWidth
                                            label={"E-mail address"}
                                        />
                                    </Bind>
                                </GridCell>
                            </Grid>

                            <Grid>
                                <GridCell span="12">
                                    <Bind name="password" validators={["required", "password"]}>
                                        <Input
                                            placeholder={"Password"}
                                            fullWidth
                                            label={"Password"}
                                            type={"password"}
                                        />
                                    </Bind>
                                </GridCell>
                            </Grid>

                            <Grid>
                                <GridCell span="12">
                                    <Button.Primary raised onClick={form.submit}>
                                        {t`Submit`}
                                    </Button.Primary>
                                </GridCell>
                            </Grid>
                        </Elevation>
                    )}
                </Form>
            </div>
        );
    }

    __render() {
        const { Alert, Form, Input, Password, Button, Email, Loader } = this.props.modules;

        return (
            <sign-in-form class={classSet("sign-in", this.props.overlay && "overlay")}>
                <Form onSubmit={model => submitLogin({ model })}>
                    {({ form, Bind }) => (
                        <div className="container">
                            <div className="sign-in-holder">
                                <div className="form-signin">
                                    {this.state.loading && <Loader />}
                                    <a href="#" className="logo">
                                        <img src={logoOrange} width="180" height="58" />
                                    </a>

                                    <h2 className="form-signin-heading">
                                        <span />
                                        {t`Sign in to your Account`}
                                    </h2>

                                    <div className="clear" />
                                    {this.state.error && (
                                        <Alert type={"error"}>{this.state.error.message}</Alert>
                                    )}
                                    <div className="clear" />

                                    {this.state.twoFactorAuth && (
                                        <Bind name="twoFactorAuthCode" validators={["required"]}>
                                            <Input
                                                placeholder={t`Enter your verification code`}
                                                label={t`Verification code`}
                                                onEnter={form.submit}
                                                autoFocus={true}
                                            />
                                        </Bind>
                                    )}

                                    {!this.state.twoFactorAuth && (
                                        <div>
                                            <Bind
                                                name="username"
                                                validators={["required", "email"]}
                                            >
                                                <Email
                                                    placeholder={t`Enter email`}
                                                    label={t`Email address`}
                                                    onEnter={form.submit}
                                                    autoFocus={true}
                                                />
                                            </Bind>
                                            <Bind name="password" validators={["required"]}>
                                                <Password
                                                    placeholder={t`Password`}
                                                    label={t`Password`}
                                                    onEnter={form.submit}
                                                />
                                            </Bind>
                                        </div>
                                    )}

                                    <div className="form-footer">
                                        <Button
                                            type="primary"
                                            style={{ float: "right" }}
                                            size="large"
                                            onClick={form.submit}
                                            icon={["fas", "arrow-alt-circle-right"]}
                                            className={styles.btnLogin}
                                        >
                                            <span>{t`Submit`}</span>
                                        </Button>
                                    </div>
                                </div>

                                <p className="copyright">{t`powered by`}</p>
                                <a href="https://www.webiny.com/" className="site">
                                    www.webiny.com
                                </a>
                            </div>
                        </div>
                    )}
                </Form>
            </sign-in-form>
        );
    }
}

Login.defaultProps = {
    overlay: false,
    async onSubmit(model) {
        const security = app.security;
        try {
            const { identity, strategy } = this.props;

            this.setState({ loading: true });
            const result = await security.login(identity, strategy, model);
            this.setState({ loading: false });
            if (result.token) {
                return this.props.onSuccess(result);
            }
        } catch (e) {
            this.setState({ error: e, loading: false });
        }
    }
};

export default Login;

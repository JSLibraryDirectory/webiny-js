// @flow
import * as React from "react";
import invariant from "invariant";
import { inject, i18n } from "webiny-client";
import logoOrange from "./../../assets/images/logo_orange.png";

import { submitAuthenticate } from "../actions";
import { connect } from "react-redux";
import { compose } from "recompose";
import styled from "react-emotion";
import _ from "lodash";

import { Elevation } from "webiny-client-ui-material/Elevation";
import Button from "webiny-client-ui-material/Button";
import Input from "webiny-client-ui-material/Input";
import { Grid, Cell } from "webiny-client-ui-material/Grid";

const t = i18n.namespace("Webiny.Admin.Auth.Login");

const LoginContent = styled("div")({
    backgroundColor: "white",
    maxWidth: 600,
    margin: "75px auto 0",
    img: {
        margin: "10px auto 0",
        display: "block"
    },
    position: "relative"
});

const Footer = styled("div")({
    textAlign: "center"
});

class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);
        invariant(props.identity, `You must specify an "identity" prop!`);
        invariant(props.strategy, `You must specify a "strategy" prop!`);
    }

    componentWillReceiveProps(props) {
        const authentication = _.get(props, "security.authentication", {});
        if (authentication.user) {
            props.onSuccess(authentication.user);
        }
    }

    render() {
        const { Form, Loader } = this.props.modules;
        const { identity, strategy } = this.props;
        const authentication = _.get(this.props, "security.authentication", {});

        return (
            <Form onSubmit={model => submitAuthenticate({ ...model, identity, strategy })}>
                {({ form, Bind }) => (
                    <React.Fragment>
                        <LoginContent>
                            <Elevation z={2}>
                                {authentication.inProgress && <Loader />}

                                <Grid>
                                    <Cell span={12}>
                                        <img src={logoOrange} width="180" height="58" />
                                    </Cell>
                                </Grid>

                                <Grid>
                                    <Cell span={12}>
                                        <h2>{t`Sign In`}</h2>
                                        <p>{t`to continue to Webiny`}</p>
                                    </Cell>
                                </Grid>

                                {authentication.error && (
                                    <Grid>
                                        <Cell span={12}>
                                            {authentication.error.message}
                                        </Cell>
                                    </Grid>
                                )}

                                <Grid>
                                    <Cell span={12}>
                                        <Bind name="username" validators={["required", "email"]}>
                                            <Input
                                                placeholder={t`Enter e-mail`}
                                                fullWidth
                                                label={"E-mail address"}
                                            />
                                        </Bind>
                                    </Cell>
                                </Grid>

                                <Grid>
                                    <Cell span={12}>
                                        <Bind name="password" validators={["required", "password"]}>
                                            <Input
                                                placeholder={"Password"}
                                                fullWidth
                                                label={"Password"}
                                                type={"password"}
                                            />
                                        </Bind>
                                    </Cell>
                                </Grid>

                                <Grid>
                                    <Cell span={12}>
                                        <Button.Primary raised onClick={form.submit}>
                                            {t`Submit`}
                                        </Button.Primary>
                                    </Cell>
                                </Grid>
                            </Elevation>
                        </LoginContent>
                        <Footer>
                            <p>{t`powered by`}</p>
                            <a href="https://www.webiny.com/">www.webiny.com</a>
                        </Footer>
                    </React.Fragment>
                )}
            </Form>
        );
    }
}

export default compose(
    inject({
        modules: ["Form", "Input", "Password", "Button", "Email", "Loader", "Alert"]
    }),
    connect(state => ({
        security: state.security
    }))
)(Login);

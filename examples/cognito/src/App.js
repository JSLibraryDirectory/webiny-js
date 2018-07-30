import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import awsConfig from "./awsConfig";

// Future package
import Authenticator from "cognito-react/Authenticator";
import SignIn from "cognito-react/screens/SignIn";
import SignUp from "cognito-react/screens/SignUp";
import ConfirmSignUp from "cognito-react/screens/ConfirmSignUp";
import ForgotPassword from "cognito-react/screens/ForgotPassword";
import ConfirmSignIn from "cognito-react/screens/ConfirmSignIn";
import Profile from "cognito-react/screens/Profile";
import SetupMFA from "cognito-react/screens/SetupMFA";
import { Elevation } from "webiny-client-ui-material/Elevation";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Authenticator config={awsConfig}>
                    {({ authProps }) => (
                        <Elevation z={2} style={{ width: 600, margin: "20px auto" }}>
                            <SignIn {...authProps} />
                            <SignUp {...authProps} />
                            <ConfirmSignUp {...authProps} />
                            <ConfirmSignIn {...authProps} />
                            <ForgotPassword {...authProps} />
                            <Profile {...authProps} />
                            <SetupMFA {...authProps} />
                        </Elevation>
                    )}
                </Authenticator>
            </div>
        );
    }
}

export default App;

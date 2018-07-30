import React from "react";
import Amplify, { Auth } from "aws-amplify";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import QRCode from "qrcode";
import { withAuthenticator } from "aws-amplify-react";
import jwks from "./jwks";

Amplify.configure({
    Auth: {
        identityPoolId: "us-east-1:798541c7-fdea-496a-9ed2-ff503334cb58",
        region: "us-east-1",
        userPoolId: "us-east-1_jx3yiHXtW",
        userPoolWebClientId: "4asrgcfftts4pubkk1bpgrph1r"
    }
});

class AuthScreen extends React.Component {
    state = {
        code: null,
        totp: ""
    };

    async componentDidMount() {
        this.user = await Auth.currentAuthenticatedUser();
        const session = await Auth.currentSession();
        console.log(this.user);

        //await Auth.setPreferredMFA(this.user, "TOTP");
        //console.log(await Auth.getMFAOptions(this.user));

        const code = await Auth.setupTOTP(this.user);
        const url =
            "otpauth://totp/AWSCognito:" +
            this.user.username +
            "?secret=" +
            code +
            "&issuer=MySite";

        QRCode.toDataURL(url, (err, data_url) => {
            this.setState({ code: data_url });
        });

        if (this.user) {
            // You can get jwk from https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json
            // ON SERVER: https://cognito-idp.us-east-1.amazonaws.com/us-east-1_jx3yiHXtW/.well-known/jwks.json
            // Get JWKs from the URL above
            /*const token = session.idToken.jwtToken;
            const pem = jwkToPem(jwks[0]);
            jwt.verify(token, pem, function(err, decoded) {
                console.log("DECODED TOKEN", decoded);
            });*/
        }
    }

    verifyTOTP = () => {
        Auth.verifyTotpToken(this.user, this.state.totp)
            .then(() => {
                // don't forget to set TOTP as the preferred MFA method
                Auth.setPreferredMFA(this.user, "TOTP");
                this.setState({ code: null });
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.code && (
                    <React.Fragment>
                        <img alt="qrcode" src={this.state.code} />
                        <input
                            type={"text"}
                            value={this.state.totp}
                            onChange={e => this.setState({ totp: e.target.value })}
                        />
                        <button onClick={() => this.verifyTOTP()}>Verify TOTP</button>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default withAuthenticator(AuthScreen);

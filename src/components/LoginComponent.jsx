import { createSignal } from "solid-js";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function LoginComponent() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const onSubmit = (event) => {
    event.preventDefault();

    const authenticationData = {
      Username: email(),
      Password: password(),
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email(),
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("access token + " + result.getAccessToken().getJwtToken());
      },
      onFailure: function (err) {
        console.log(err);
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        const prompt = require("prompt-sync")({ sigint: true });

        const newPassword = prompt("Please enter a new password", {
          echo: "*",
        });

        delete userAttributes.email;

        cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
          onSuccess: function (result) {
            console.log("Password changed successfully");
          },
          onFailure: function (err) {
            console.log("Password change failed", err);
          },
        });
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default LoginComponent;

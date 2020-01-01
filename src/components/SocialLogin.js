import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import {cognitoFB, cognitoGoogle} from "../actions";

export default function SocialLogin() {
  const term = useSelector(state => state.term);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <FacebookLogin
        appId="1500181530138959"
        fields="first_name,last_name,email"
        callback={response => {
          console.log(response);
          dispatch(cognitoFB(response, history, term));
        }}
        render={renderProps => (
          <button
            className="loginBtn loginBtn--facebook"
            onClick={renderProps.onClick}
          >
            Continue with Facebook
          </button>
        )}
      />
      <GoogleLogin
        clientId="962985476906-csuu6ls66lbh7s4n8pce07sid6m1obh3.apps.googleusercontent.com"
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="loginBtn loginBtn--google"
          >
            Continue with Google
          </button>
        )}
        buttonText="Login"
        onSuccess={response => dispatch(cognitoGoogle(response, history, term))}
        onFailure={response => alert(response.details)}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

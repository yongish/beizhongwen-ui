import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router"; // react-router v4/v5
import {BrowserRouter as Router} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import Amplify from "aws-amplify";

import "./styles/index.css";
import config from "./config";
import App from "./components/App";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import * as serviceWorker from "./serviceWorker";

import configureStore, {history} from "./configureStore";

const store = configureStore();
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const NoMatch = ({location}) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/login/reset" component={ResetPassword} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/" exact component={App} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

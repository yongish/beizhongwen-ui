import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router"; // react-router v4/v5
import {BrowserRouter as Router} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import Amplify from "aws-amplify";
import throttle from "lodash/throttle";

import "./styles/index.css";
import config from "./config";
import App from "./components/App";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import * as serviceWorker from "./serviceWorker";

import configureStore, {history} from "./configureStore";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {
    // ignore write errors
  }
};
const persistedState = loadState();
const store = configureStore(persistedState);
store.subscribe(
  throttle(() => {
    saveState({
      user: store.getState().user
    });
  }, 1000)
);

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
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route path="/login/reset" component={ResetPassword} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/term/:term" component={App} />
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

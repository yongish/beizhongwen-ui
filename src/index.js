import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router"; // react-router v4/v5
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";

import "./styles/index.css";
import App from "./components/App";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import * as serviceWorker from "./serviceWorker";

import configureStore, {history} from "./configureStore";

const store = configureStore();

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

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? <App /> : <Login />;
  // <p>
  //   Welcome!{" "}
  //   <button
  //     onClick={() => {
  //       fakeAuth.signout(() => history.push("/"));
  //     }}
  //   >
  //     Sign out
  //   </button>
  // </p>
}

const NoMatch = ({location}) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          <Route path="/profile" component={Profile} />
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

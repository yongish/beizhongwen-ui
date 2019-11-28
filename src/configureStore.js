import {createBrowserHistory} from "history";
import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";
import {routerMiddleware} from "connected-react-router";
import {composeWithDevTools} from "redux-devtools-extension";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const loggerMiddleware = createLogger();

const enhancers = [];
const middleware = [thunk, loggerMiddleware, routerMiddleware(history)];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

export default function configureStore(preloadedState) {
  const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState"))
    : {};
  const startState = (({login, tab}) => ({login, tab}))(persistedState);

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    // preloadedState,
    // persistedState,
    startState,
    composedEnhancers
  );

  return store;
}

import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import {
  CONFIRM_RESET_SUCCESS,
  CONFIRM_RESET_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SELECT_TAB,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
  SET_CHECKED,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PASSWORD,
  SET_NEW_USER,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAILURE,
  TOGGLE_SUGGESTION_VISIBILITY
} from "../actions";

const codeSent = (state = false, action: {type: string}) => {
  switch (action.type) {
    case SEND_CODE_SUCCESS:
      return true;
    case SEND_CODE_FAILURE:
      return false;
    default:
      return state;
  }
};

const email = (state = "", action: {type: string, email: string}) => {
  switch (action.type) {
    case SET_EMAIL:
      return action.email;
    default:
      return state;
  }
};

const firstName = (state = "", action: {type: string, firstName: string}) => {
  switch (action.type) {
    case SET_FIRST_NAME:
      return action.firstName;
    default:
      return state;
  }
};

const lastName = (state = "", action: {type: string, lastName: string}) => {
  switch (action.type) {
    case SET_LAST_NAME:
      return action.lastName;
    default:
      return state;
  }
};

const password = (state = "", action: {type: string, password: string}) => {
  switch (action.type) {
    case SET_PASSWORD:
      return action.password;
    default:
      return state;
  }
};

const newUser = (state = null, action: {type: string, newUser: string}) => {
  switch (action.type) {
    case SET_NEW_USER:
      return action.newUser;
    default:
      return state;
  }
};

const login = (state = false, action: {type: string}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILURE:
      return false;
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return false;
    case LOGOUT_FAILURE:
      return state;
    default:
      return state;
  }
};

const resetConfirmed = (state = false, action: {type: string}) => {
  switch (action.type) {
    case CONFIRM_RESET_SUCCESS:
      return true;
    case CONFIRM_RESET_FAILURE:
      return false;
    default:
      return state;
  }
};

const score = (state = 0, action: {type: string}) => {
  switch (action.type) {
    case SCORE_REQUEST:
      return state;
    case SCORE_SUCCESS:
      return action.response;
    case SCORE_FAILURE:
      return state;
    default:
      return state;
  }
};

const checked = (state = {}, action: {type: string, index: number}) => {
  switch (action.type) {
    case SET_CHECKED:
      if (action.index in state) {
        state[action.index] = !state[action.index];
      } else {
        state[action.index] = true;
      }
      return state;
    default:
      return state;
  }
};

const suggestionVisible = (state = false, action: {type: string}) => {
  switch (action.type) {
    case TOGGLE_SUGGESTION_VISIBILITY:
      return !state;
    default:
      return state;
  }
};
// todo: state = "home" after Content.js is done.
const tab = (state = "term", action: {type: string, tab: string}) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    default:
      return state;
  }
};

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    checked,
    codeSent,
    resetConfirmed,
    email,
    password,
    firstName,
    lastName,
    newUser,
    login,
    score,
    suggestionVisible,
    tab
  });

export default rootReducer;

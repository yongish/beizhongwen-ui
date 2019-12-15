import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import {
  CONFIRM_RESET_SUCCESS,
  CONFIRM_RESET_FAILURE,
  FIND_TERM_REQUEST,
  FIND_TERM_SUCCESS,
  FIND_TERM_FAILURE,
  LATEST_TERM_REQUEST,
  LATEST_TERM_SUCCESS,
  LATEST_TERM_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAILURE,
  SELECT_TAB,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILURE,
  SET_CHECKED,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_NEW_USER,
  SET_PASSWORD,
  SET_TERM,
  TOGGLE_SUGGESTION_VISIBILITY
} from "../actions";

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

const suggestionVisible = (state = false, action: {type: string}) => {
  switch (action.type) {
    case TOGGLE_SUGGESTION_VISIBILITY:
      return !state;
    default:
      return state;
  }
};

const tab = (state = "home", action: {type: string, tab: string}) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    case SET_TERM:
      return "term";
    default:
      return state;
  }
};

const term = (state = null, action: {type: string, term: string}) => {
  switch (action.type) {
    case SET_TERM:
      return action.term;
    default:
      return state;
  }
};

const latestTerms = (state = [], action: {type: string}) => {
  switch (action.type) {
    case LATEST_TERM_REQUEST:
      return state;
    case LATEST_TERM_SUCCESS:
      return action.response;
    case LATEST_TERM_FAILURE:
      return state;
    default:
      return state;
  }
};

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, "")
});
const searchOptions = (state = [], action: {type: string, term: string}) => {
  switch (action.type) {
    case FIND_TERM_REQUEST:
      return state;
    case FIND_TERM_SUCCESS:
      return action.response.map(createOption);
    case FIND_TERM_FAILURE:
      return state;
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
    tab,
    term,
    latestTerms,
    searchOptions
  });

export default rootReducer;

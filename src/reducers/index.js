import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import {
  COGNITO_FB_SUCCESS,
  COGNITO_FB_FAILURE,
  COGNITO_GOOGLE_SUCCESS,
  COGNITO_GOOGLE_FAILURE,
  CONFIRM_RESET_SUCCESS,
  CONFIRM_RESET_FAILURE,
  DELETE_SUGGESTION_REQUEST,
  DELETE_SUGGESTION_SUCCESS,
  DELETE_SUGGESTION_FAILURE,
  FIND_TERM_REQUEST,
  FIND_TERM_SUCCESS,
  FIND_TERM_FAILURE,
  GET_SUGGESTION_REQUEST,
  GET_SUGGESTION_SUCCESS,
  GET_SUGGESTION_FAILURE,
  LATEST_TERM_REQUEST,
  LATEST_TERM_SUCCESS,
  LATEST_TERM_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  POST_TERM_REQUEST,
  POST_TERM_SUCCESS,
  POST_TERM_FAILURE,
  POST_SUGGESTION_REQUEST,
  POST_SUGGESTION_SUCCESS,
  POST_SUGGESTION_FAILURE,
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
  SET_ORIGINAL_SUGGESTION,
  SET_PASSWORD,
  SET_SUGGESTION_CONTENT,
  SET_TERM,
  TOGGLE_EDIT,
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

const edit = (state = false, action: {type: string, edit: boolean}) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return action.edit;
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

const user = (state = {}, action: {type: string}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const attributes = action.user.attributes;
      return {
        email: attributes.email,
        givenName: attributes.given_name,
        familyName: attributes.family_name,
        provider: "email"
      };
    case LOGIN_FAILURE:
      return state;
    case COGNITO_FB_SUCCESS:
      return {
        email: action.email,
        givenName: action.first_name,
        familyName: action.last_name,
        provider: "facebook"
      };
    case COGNITO_FB_FAILURE:
      return state;
    case COGNITO_GOOGLE_SUCCESS:
      return {
        email: action.email,
        givenName: action.givenName,
        familyName: action.familyName,
        provider: "google"
      };
    case COGNITO_GOOGLE_FAILURE:
      return state;
    case LOGOUT_SUCCESS:
      return {};
    case LOGOUT_FAILURE:
      return state;
    default:
      return state;
  }
};

const originalSuggestion = (
  state = "",
  action: {type: string, suggestionContent: string}
) => {
  switch (action.type) {
    case SET_ORIGINAL_SUGGESTION:
      return action.suggestionContent;
    case POST_SUGGESTION_SUCCESS:
      return "";
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

const suggestionContent = (
  state = "",
  action: {type: string, suggestionContent: string}
) => {
  switch (action.type) {
    case SET_SUGGESTION_CONTENT:
      return action.suggestionContent;
    default:
      return state;
  }
};

const suggestions = (state = [], action: {type: string}) => {
  switch (action.type) {
    case GET_SUGGESTION_REQUEST:
    case GET_SUGGESTION_FAILURE:
    case POST_SUGGESTION_REQUEST:
    case POST_SUGGESTION_FAILURE:
    case DELETE_SUGGESTION_REQUEST:
    case DELETE_SUGGESTION_FAILURE:
      return state;
    case GET_SUGGESTION_SUCCESS:
    case DELETE_SUGGESTION_SUCCESS:
      const suggestions = action.response;
      return suggestions;
    case POST_SUGGESTION_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const suggestionVisible = (state = false, action: {type: string}) => {
  switch (action.type) {
    case TOGGLE_SUGGESTION_VISIBILITY:
      return !state;
    case POST_SUGGESTION_REQUEST:
      return false;
    default:
      return state;
  }
};

const tab = (state = "home", action: {type: string, tab: string}) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    case LOGOUT_SUCCESS:
      return "home";
    default:
      return state;
  }
};

const term = (state = null, action: {type: string, term: string}) => {
  switch (action.type) {
    case SET_TERM:
      return action.term;
    case POST_TERM_SUCCESS:
      return action.term;
    case LOGOUT_SUCCESS:
      return null;
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
    case POST_TERM_REQUEST:
      return state;
    case FIND_TERM_SUCCESS:
      if (Array.isArray(action.response)) {
        return action.response.map(createOption);
      }
      break;
    case FIND_TERM_FAILURE:
    case POST_TERM_FAILURE:
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
    edit,
    resetConfirmed,
    email,
    password,
    firstName,
    lastName,
    newUser,
    originalSuggestion,
    score,
    suggestionContent,
    suggestionVisible,
    suggestions,
    tab,
    term,
    latestTerms,
    searchOptions,
    user
  });

export default rootReducer;

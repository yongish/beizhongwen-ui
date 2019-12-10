// import store from "../index";
import {Auth} from "aws-amplify";

const API_ROOT = "http://localhost:8080/";

export const confirm = (
  email,
  password,
  confirmationCode,
  history
) => async dispatch => {
  try {
    await Auth.confirmSignUp(email, confirmationCode);
    await Auth.signIn(email, password);
    history.push("/");
  } catch (e) {
    alert(e.message);
  }
};

// todo: refresh token if fail. in middleware
export const getScore = (uid, token) => dispatch => {
  const fullUrl = API_ROOT + "score/" + uid;
  dispatch({type: SCORE_REQUEST});
  return fetch(fullUrl, {
    headers: {
      Authorization: "Bearer " + token
    }
  }).then(
    response =>
      response.json().then(json => {
        dispatch({type: SCORE_SUCCESS, response: json});
      }),
    error => {
      dispatch({type: SCORE_FAILURE, error: error});
    }
  );
};

export const setChecked = index => dispatch => {
  dispatch({type: SET_CHECKED, index});
};

export const setEmail = email => dispatch => {
  dispatch({type: SET_EMAIL, email});
};

export const setFirstName = firstName => dispatch => {
  dispatch({type: SET_FIRST_NAME, firstName});
};

export const setLastName = lastName => dispatch => {
  dispatch({type: SET_LAST_NAME, lastName});
};

export const setPassword = password => dispatch => {
  dispatch({type: SET_PASSWORD, password});
};

export const setNewUser = newUser => dispatch => {
  dispatch({type: SET_NEW_USER, newUser});
};

export const login = (email, password, history) => async dispatch => {
  try {
    await Auth.signIn(email, password);
    // todo: May need to record username rather than just a boolean.
    // const user = await Auth.signIn(email, password);
    dispatch({type: LOGIN_SUCCESS});
    dispatch({type: SELECT_TAB, tab: "home"});
    history.push("/");
  } catch (e) {
    alert("Login failed. Invalid email or password.");
    dispatch({type: LOGIN_FAILURE});
  }
};

export const logout = () => async dispatch => {
  try {
    await Auth.signOut();
    dispatch({type: LOGOUT_SUCCESS});
    dispatch({type: SELECT_TAB, tab: "term"});
  } catch (e) {
    dispatch({type: LOGOUT_FAILURE});
  }
};

export const signup = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        family_name: lastName,
        given_name: firstName
      }
    });
    dispatch({type: SIGNUP_SUCCESS});
    dispatch({type: SET_NEW_USER, newUser: true});
  } catch (e) {
    if (e.name.toLowerCase().includes("usernameexistsexception")) {
      dispatch({type: SET_NEW_USER, newUser: false});
    } else {
      alert(e.message);
      dispatch({type: SIGNUP_FAILURE});
    }
  }
};

export const sendCode = email => async dispatch => {
  try {
    await Auth.forgotPassword(email);
    dispatch({type: SEND_CODE_SUCCESS});
  } catch (e) {
    alert(e.message);
    dispatch({type: SEND_CODE_FAILURE});
  }
};

export const confirmReset = (email, code, password) => async dispatch => {
  try {
    await Auth.forgotPasswordSubmit(email, code, password);
    dispatch({type: CONFIRM_RESET_SUCCESS});
  } catch (e) {
    alert(e.message);
    dispatch({type: CONFIRM_RESET_FAILURE});
  }
};

export const selectTab = tab => dispatch => {
  dispatch({type: SELECT_TAB, tab});
};

export const toggleSuggestionVisibilty = () => dispatch => {
  dispatch({type: TOGGLE_SUGGESTION_VISIBILITY});
};

export const CONFIRM_RESET_SUCCESS: string = "CONFIRM_RESET_SUCCESS";
export const CONFIRM_RESET_FAILURE: string = "CONFIRM_RESET_FAILURE";
export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";
export const LOGOUT_REQUEST: string = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: string = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE: string = "LOGOUT_FAILURE";
export const SCORE_REQUEST: string = "SCORE_REQUEST";
export const SCORE_SUCCESS: string = "SCORE_SUCCESS";
export const SCORE_FAILURE: string = "SCORE_FAILURE";
export const SELECT_TAB: string = "SELECT_TAB";
export const SEND_CODE_SUCCESS: string = "SEND_CODE_SUCCESS";
export const SEND_CODE_FAILURE: string = "SEND_CODE_FAILURE";
export const SET_CHECKED: string = "SET_CHECKED";
export const SET_EMAIL: string = "SET_EMAIL";
export const SET_FIRST_NAME: string = "SET_FIRST_NAME";
export const SET_LAST_NAME: string = "SET_LAST_NAME";
export const SET_PASSWORD: string = "SET_PASSWORD";
export const SET_NEW_USER: string = "SET_NEW_USER";
export const SIGNUP_REQUEST: string = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS: string = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE: string = "SIGNUP_FAILURE";
export const TOGGLE_SUGGESTION_VISIBILITY: string =
  "TOGGLE_SUGGESTION_VISIBILITY";

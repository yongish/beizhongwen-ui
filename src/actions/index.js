import store from "../index";
import {useHistory} from "react-router-dom";
import {Auth} from "aws-amplify";

const API_ROOT = "http://localhost:8080/";

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

export const login = (email, password) => async dispatch => {
  try {
    const user = await Auth.signIn(email, password);
    console.log(user);
    dispatch({type: LOGIN_SUCCESS});
    dispatch({type: SELECT_TAB, tab: "home"});
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

export const selectTab = tab => dispatch => {
  dispatch({type: SELECT_TAB, tab});
};

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

import store from "../index";
import {useHistory} from "react-router-dom";

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

export const login = (email, password) => dispatch => {
  dispatch({type: LOGIN_SUCCESS});
};
// const fullUrl = "LOGIN_URL";
// console.log("AAAAAAAAAAAAAA");

// return fetch(fullUrl, {
//   headers: {
//
//   }
// }).then (
//   response => response.json().then (
//     json => {
//       dispatch({ type: LOGIN_SUCCESS, response: json });
//     }
//   ),
//   error => {
//     dispatch({ type: LOGIN_FAILURE, error: error });
//   }
// )
// };

export const selectTab = tab => dispatch => {
  dispatch({type: SELECT_TAB, tab});
};

export const LOGIN_REQUEST: string = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGIN_FAILURE: string = "LOGIN_FAILURE";
export const SCORE_REQUEST: string = "SCORE_REQUEST";
export const SCORE_SUCCESS: string = "SCORE_SUCCESS";
export const SCORE_FAILURE: string = "SCORE_FAILURE";
export const SELECT_TAB: string = "SELECT_TAB";

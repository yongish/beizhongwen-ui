import store from '../index';

const API_ROOT = 'http://localhost:8080/';

export const login = (uid, password) => dispatch => {
  const fullUrl = 'LOGIN_URL';
  dispatch({ type: LOGIN_REQUEST });
  return fetch(fullUrl, {
    headers: {

    }
  }).then (
    response => response.json().then (
      json => {
        dispatch({ type: LOGIN_SUCCESS, response: json });
      }
    ),
    error => {
      dispatch({ type: LOGIN_FAILURE, error: error });
    }
  )
}

// todo: refresh token if fail. in middleware
export const getScore = (uid, token) => dispatch => {
  const fullUrl = API_ROOT + 'score/' + uid;
  dispatch({ type: SCORE_REQUEST });
  return fetch(fullUrl, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then(
    response => response.json().then(
      json => {
        dispatch({ type: SCORE_SUCCESS, response: json });
      }
    ),
    error => {
      dispatch({ type: SCORE_FAILURE, error: error });
    }
  )
}

export const selectTab = tab => ({ type: SELECT_TAB, tab });

export const LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE: string = 'LOGIN_FAILURE';
export const SCORE_REQUEST: string = 'SCORE_REQUEST';
export const SCORE_SUCCESS: string = 'SCORE_SUCCESS';
export const SCORE_FAILURE: string = 'SCORE_FAILURE';
export const SELECT_TAB: string = 'SELECT_TAB';

import store from '../index';

const API_ROOT = 'http://localhost:8080/';

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

export const selectTab = tab => dispatch => {
  dispatch({ type: SELECT_TAB, tab });
}

export const SCORE_REQUEST: string = 'SCORE_REQUEST';
export const SCORE_SUCCESS: string = 'SCORE_SUCCESS';
export const SCORE_FAILURE: string = 'SCORE_FAILURE';
export const SELECT_TAB: string = 'SELECT_TAB';

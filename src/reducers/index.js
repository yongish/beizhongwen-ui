import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SELECT_TAB,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAILURE
} from '../actions';

const login = (state = false, action: { type: string }) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAILURE:
      return false;
    default:
      return state;
  }
}

const score = (state = 0, action: { type: string }) => {
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
}

const tab = (state = 'term', action: { type: string, tab: string }) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    default:
      return state;
  }
}

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login,
  score,
  tab
});

export default rootReducer;

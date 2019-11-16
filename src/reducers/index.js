import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  SELECT_TAB,
  SCORE_REQUEST,
  SCORE_SUCCESS,
  SCORE_FAILURE
} from '../actions';

const score = (state = 0, action : { type: string }) => {
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

const tab = (state = 'home', action : { type: string, tab: string }) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    default:
      return state;
  }
}

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  score,
  tab
});

export default rootReducer;

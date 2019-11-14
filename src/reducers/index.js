import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  SELECT_TAB
} from '../actions';

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
  tab
});

export default rootReducer;

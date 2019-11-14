import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  SELECT_TAB
} from '../actions';

const platform = (state = 'home', action : { type: string, tab: string }) => {
  switch (action.type) {
    case SELECT_TAB:
      return action.tab;
    default:
    return state;
  }
}

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  platform
});

export default rootReducer;

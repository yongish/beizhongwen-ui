import store from '../index';

export const selectTab = tab => dispatch => {
  dispatch({ type: SELECT_TAB, tab });
}

export const SELECT_TAB: string = 'SELECT_TAB';

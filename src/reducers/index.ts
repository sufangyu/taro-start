import { combineReducers } from 'redux';

import debug from './debug';
import account from './account';

export default combineReducers({
  debug,
  account,
});

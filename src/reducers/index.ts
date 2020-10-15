import { combineReducers } from 'redux';

import debug from './debug';
import account from './account';
import tabbar from './tabbar';

export default combineReducers({
  debug,
  account,
  tabbar,
});

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const middleWares = [createLogger()];

export default function appStore() {
  const store = createStore(rootReducer, applyMiddleware(...middleWares));
  return store;
}

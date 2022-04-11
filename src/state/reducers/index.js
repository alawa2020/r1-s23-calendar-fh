import { combineReducers } from 'redux';
import { uiReducer } from './uiReducer';

export const reducers = combineReducers({
  ui: uiReducer,
});
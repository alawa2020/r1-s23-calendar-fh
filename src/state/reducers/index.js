import { combineReducers } from 'redux';

import { eventsReducer } from './eventsReducer';
import { uiReducer } from './uiReducer';


export const reducers = combineReducers({
  ui: uiReducer,
  events: eventsReducer, 
});
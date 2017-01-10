import { combineReducers } from 'redux';

import app from './app';
import search from './search';
import settings from './settings';
import advance from './advance';

const rootReducer = combineReducers({ app, search, settings, advance });

export default rootReducer;

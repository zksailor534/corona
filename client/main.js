import { createApp } from 'mantra-core';
import initContext from './configs/context';

// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Modules
import coreModule from './modules/core';
import userModule from './modules/user';

// Combine Reducers
const reducer = combineReducers({
  ...coreModule.reducer,
  ...userModule.reducer,
  routing: routerReducer
});

// Init Context
const context = initContext({reducer});

// Create App
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(userModule);
app.init();

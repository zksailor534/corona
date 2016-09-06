import { createApp } from 'mantra-core';

// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Context
import initContext from './configs/context';

// Modules
import coreModule from './modules/core';
import documentsModule from './modules/documents';

// Combine Reducers
const reducer = combineReducers({
  ...coreModule.reducer,
  ...documentsModule.reducer,
  routing: routerReducer,
});

// Init Context
const context = initContext({ reducer });

// Create App
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(documentsModule);
app.init();

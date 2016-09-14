import { createApp } from 'mantra-core';

// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Context
import initContext from './configs/context';

// Modules
import coreModule from './modules/core';
import documentsModule from './modules/documents';

// Combine Reducers
const reducers = combineReducers({
  ...coreModule.reducers,
  ...documentsModule.reducers,
  routing: routerReducer,
  form: formReducer,
});

// Init Context
const context = initContext({ reducers });

// Create App
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(documentsModule);
app.init();

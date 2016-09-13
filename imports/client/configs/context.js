import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import * as Collections from '/lib/collections';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

export default function ({ reducers }) {
  // Ensure no user is logged in on startup
  Meteor.logout();

  const initialState = {
    accounts: {
      isFetching: false,
      isAuthenticated: false,
    },
  };

  const Store = createStore(reducers,
    initialState,
    compose(
      applyMiddleware(ReduxThunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return {
    Meteor,
    Tracker,
    Collections,
    Store,
  };
}

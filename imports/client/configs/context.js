import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import * as Collections from '/lib/collections';

// Redux
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

export default function ({ reducers }) {
  const initialState = {
    login: {
      isFetching: false,
      isAuthenticated: Meteor.userId() !== null,
    }
  }
  const Store = createStore(reducers,
    initialState,
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  return {
    Meteor,
    Tracker,
    Collections,
    Store,
  };
}

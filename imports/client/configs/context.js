import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import * as Collections from '/lib/collections';

// Redux
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

export default function ({ reducers }) {
  const Store = createStore(reducers,
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

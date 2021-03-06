import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Bert } from 'meteor/themeteorchef:bert';
import * as Collections from '/imports/lib/collections';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

export default function ({ reducers }) {
  // Ensure no user is logged in on startup
  Meteor.logout();

  // Set Bert alert defaults
  Bert.defaults = {
    hideDelay: 2000,
    style: 'growl-top-right',
  };

  const initialState = {
    accounts: {
      isFetching: false,
      isAuthenticated: false,
      signup: Meteor.settings.public.accounts.signup,
      invite: Meteor.settings.public.accounts.invite,
      central: !Meteor.settings.public.accounts.signup && !Meteor.settings.public.accounts.invite,
    },
  };

  const Store = createStore(reducers,
    initialState,
    compose(
      applyMiddleware(ReduxThunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  return {
    Meteor,
    Tracker,
    Collections,
    Store,
    Bert,
  };
}

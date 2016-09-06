import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import * as Collections from '/lib/collections';

// Redux
import { createStore } from 'redux';

export default function ({ reducer }) {
  return {
    Meteor,
    Tracker,
    Collections,
    Store: createStore(
      reducer,
      window.devToolsExtension && window.devToolsExtension()
    ),
  };
}

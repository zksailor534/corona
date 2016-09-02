import { Meteor } from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

// Redux
import { createStore } from 'redux';

export default function ({ reducer }) {
  return {
    Meteor,
    Tracker,
    Store: createStore(reducer)
  };
};

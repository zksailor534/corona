import { Meteor } from 'meteor/meteor';
import { Documents } from '/lib/collections';

export default function () {
  Meteor.publish('documents', () => Documents.find());
}

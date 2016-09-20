import { Meteor } from 'meteor/meteor';
import { Documents } from '/imports/lib/collections';

export default function () {
  Meteor.publish('documents', () => Documents.find());
}

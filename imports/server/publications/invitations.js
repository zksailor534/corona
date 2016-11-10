import { Meteor } from 'meteor/meteor';
import { Invitations } from '/imports/lib/collections';

export default function () {
  Meteor.publish('invitations', () => Invitations.find());
}

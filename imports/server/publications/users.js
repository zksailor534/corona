import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('users', () =>
    Meteor.users.find({}, {
      fields: {
        'profile.name': 1,
        'emails.address': 1,
        roles: 1,
      },
    }),
  );
}

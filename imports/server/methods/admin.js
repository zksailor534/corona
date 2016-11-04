import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import rateLimit from '../libs/rate-limit.js';

export const setRoleOnUser = new ValidatedMethod({
  name: 'role.set',
  validate: new SimpleSchema({
    id: { type: String },
    role: { type: String },
  }).validator(),
  run(options) {
    Roles.setUserRoles(options.id, [options.role]);
  },
});

export const removeUser = new ValidatedMethod({
  name: 'user.remove',
  validate: new SimpleSchema({
    id: { type: String },
    requestingUser: { type: String },
  }).validator(),
  run(options) {
    if (Roles.userIsInRole(options.requestingUser, 'admin')) {
      console.log('removing user');
      Meteor.users.remove({ _id: options.id });
    }
  },
});

export default function () {
  rateLimit({
    methods: [
      setRoleOnUser,
      removeUser,
    ],
    limit: 5,
    timeRange: 1000,
  });
}

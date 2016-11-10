import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import { Invitations } from '/imports/lib/collections';

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

export const addUser = new ValidatedMethod({
  name: 'user.add',
  validate: new SimpleSchema({
    email: { type: String },
    password: { type: String },
    'profile.name.first': { type: String },
    'profile.name.last': { type: String },
    roles: { type: [String] },
    token: { type: String, optional: true },
  }).validator(),
  run(user) {
    // Create user
    const id = Accounts.createUser(user);

    // Add user roles
    Roles.addUsersToRoles(id, user.roles);

    // Remove invitation
    if (user.token) {
      Invitations.remove({ token: user.token });
    }

    return Meteor.users.findOne({ _id: id });
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

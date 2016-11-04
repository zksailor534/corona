/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { setRoleOnUser, removeUser } from './admin';

const fakeUser = () => ({
  email: faker.internet.email(),
  password: 'ksd8jsdn3od8',
  profile: {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
  },
});

let userOne = {};
let userTwo = {};

describe('Admin methods', () => {
  before(function () {
    // Set up test users
    // Admin user
    Accounts.createUser(fakeUser());
    userOne = Meteor.users.findOne();
    Roles.setUserRoles(userOne._id, ['admin']);

    // Create another user
    Accounts.createUser(fakeUser());
    userTwo = Meteor.users.findOne({ _id: { $ne: userOne._id } });
    Roles.setUserRoles(userTwo._id, ['user']);
  });

  it('changes a user role', () => {
    const newRole = 'manager';
    const getUserOld = Meteor.users.findOne({ _id: userTwo._id });
    expect(getUserOld.roles[0]).to.not.equal(newRole);

    // Change role
    setRoleOnUser.call(
      { id: userTwo._id, role: newRole }
    );
    const getUserNew = Meteor.users.findOne({ _id: userTwo._id });
    expect(getUserNew.roles[0]).to.equal(newRole);
  });

  it('does not allow a non-admin to remove a user', () => {
    // Change role
    removeUser.call(
      {
        id: userOne._id,
        requestingUser: userTwo._id,
      }
    );
    const getUser = Meteor.users.findOne({ _id: userOne._id });
    expect(getUser).to.not.equal(undefined);
  });

  it('allows an admin to remove a user', () => {
    // Change role
    removeUser.call(
      {
        id: userTwo._id,
        requestingUser: userOne._id,
      }
    );
    const getUser = Meteor.users.findOne({ _id: userTwo._id });
    expect(getUser).to.equal(undefined);
  });

  after(function () {
    // Clean up
    if (Meteor.isServer) {
      resetDatabase();
    }
  });
});

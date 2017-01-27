/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Invitations } from '/imports/lib/collections';
import { setRoleOnUser, addUser, removeUser } from './admin';

const fakeUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  profile: {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
  },
  roles: ['user'],
});

const fakeInvite = {
  email: faker.internet.email(),
  token: '90bfca72ff345a71',
  role: 'admin',
  date: new Date(),
};

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

    // Create an invitation
    Invitations.insert(fakeInvite);
  });

  it('creates a user without an invite', () => {
    const user = fakeUser();
    addUser.call(user);
    const getUser = Accounts.findUserByEmail(user.email);
    // eslint-disable-next-line no-unused-expressions
    expect(getUser).to.exist;
  });

  it('creates a user with an invite', () => {
    const user = fakeUser();
    addUser.call(Object.assign({}, user, { token: fakeInvite.token }));
    const getUser = Accounts.findUserByEmail(user.email);
    const getInvite = Invitations.findOne({ token: fakeInvite.token });
    // eslint-disable-next-line no-unused-expressions
    expect(getUser).to.exist;
    // eslint-disable-next-line no-unused-expressions
    expect(getInvite).to.be.undefined;
  });

  it('changes a user role', () => {
    const newRole = 'manager';
    // eslint-disable-next-line no-unused-expressions
    expect(Roles.userIsInRole(userTwo._id, [newRole])).to.be.false;

    // Change role
    setRoleOnUser.call(
      { id: userTwo._id, role: newRole },
    );
    // eslint-disable-next-line no-unused-expressions
    expect(Roles.userIsInRole(userTwo._id, [newRole])).to.be.tru;
  });

  it('does not allow a non-admin to remove a user', () => {
    // Change role
    removeUser.call(
      {
        id: userOne._id,
        requestingUser: userTwo._id,
      },
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
      },
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

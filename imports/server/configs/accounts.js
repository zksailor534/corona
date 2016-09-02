import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

const users = [
  {
    email: 'admin@mantra.com',
    password: 'password',
    profile: {
      name: { first: 'Mantra', last: 'Admin' },
    },
    roles: [ 'admin' ],
  },
];

export default function () {
  users.forEach(({ email, password, profile, roles }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile });
      Roles.addUsersToRoles(userId, roles);
    }
  });
}

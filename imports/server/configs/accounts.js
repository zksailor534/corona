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
    roles: ['admin'],
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

  // eslint-disable-next-line func-names
  Accounts.emailTemplates.resetPassword.text = function (user, url) {
    const token = url.substring(url.lastIndexOf('/') + 1, url.length);
    const newUrl = Meteor.absoluteUrl(`reset-password/${token}`);
    const userName = (user.profile.name) ?
      ` ${user.profile.name.first} ${user.profile.name.last}` :
      '';
    const str = `
Hello${userName},

To reset your password, simply click the link below.

${newUrl}

Thanks.`;
    return str;
  };
}

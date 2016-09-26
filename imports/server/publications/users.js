import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';

export default function () {
  // Meteor.publish('users', () => {
  //   const isAdmin = Roles.userIsInRole(Meteor.userId, 'admin');
  //   const isManager = Roles.userIsInRole(Meteor.userId, 'manager');
  //
  //   if (isAdmin || isManager) {
  //     return [
  //       Meteor.users.find({}, { fields: { 'emails.address': 1, roles: 1 } }),
  //     ];
  //   }
  //   return null;
  // });
  Meteor.publish('users', () =>
    Meteor.users.find({}, { fields: { 'emails.address': 1, roles: 1 } })
  );
}

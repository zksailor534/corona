import { useDeps, composeWithTracker } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';
import React from 'react';
import Loading from 'react-loading';

import UserList from '../components/UserList';

const composer = ({ context }, onData) => {
  const { Meteor } = context();
  if (Meteor.subscribe('users').ready()) {
    onData(null, {
      users: Meteor.users.find().fetch(),
    });
  }
};

const mapStateToProps = ({ accounts }) => ({
  currentUser: accounts.user ? accounts.user._id : undefined,
});

const depsMapper = (context, actions) => ({
  changeRole: actions.admin.changeRole,
  removeUser: actions.admin.removeUser,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, () => <Loading type='spokes' />),
  withRedux(mapStateToProps),
  useDeps(depsMapper)
)(UserList);

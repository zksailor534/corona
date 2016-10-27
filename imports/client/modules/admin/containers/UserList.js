import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import Loading from '/imports/client/modules/core/components/loading.js';
import UserList from '../components/UserList';

const composer = ({ context }, onData) => {
  const { Meteor } = context();
  if (Meteor.subscribe('users').ready()) {
    onData(null, { users: Meteor.users.find().fetch() });
  }
};

const depsMapper = (context, actions) => ({
  changeRole: actions.admin.changeRole,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(UserList);

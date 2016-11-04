import { useDeps, composeWithTracker } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import Loading from '/imports/client/modules/core/components/loading.js';
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
  composeWithTracker(composer, Loading),
  withRedux(mapStateToProps),
  useDeps(depsMapper)
)(UserList);

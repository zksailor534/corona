import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import Loading from '/imports/client/modules/core/components/loading.js';
import Users from '../components/users';

const initialRoles = (users) => {
  const values = {};
  let u = {};
  for (let i = 0; i < users.length; i++) {
    u = Object.values(users)[i];
    if (u.roles) {
      values[u._id] = u.roles[0];
    } else {
      values[u._id] = 'user';
    }
  }
  return values;
};

export const composer = ({ context }, onData) => {
  const { Meteor } = context();
  if (Meteor.subscribe('users').ready()) {
    const users = Meteor.users.find().fetch();
    const initialValues = initialRoles(users);
    onData(null, { users, initialValues });
  }
};

// export const depsMapper = (context) => ({
//   context: () => context,
// });

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps()
)(reduxForm({ form: 'users' })(Users));

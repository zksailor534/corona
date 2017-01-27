import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';
import { reduxForm } from 'redux-form';

import NewUser from '../components/NewUser';
import validate from '../lib/validate-field';

const mapStateToProps = ({ admin }) => ({
  show: admin.newUserModal,
});

const depsMapper = (context, actions) => ({
  signup: actions.accounts.submitSignup,
  close: actions.admin.closeNewUserModal,
  context: () => context,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps(depsMapper),
)(reduxForm({ form: 'newUser', validate })(NewUser));

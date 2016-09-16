import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import ResetPassword from '../components/reset-password';
import validate from '../lib/validate-field';

export const depsMapper = (context, actions) => ({
  resetPassword: actions.accounts.resetPassword,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'signup', validate })(ResetPassword));

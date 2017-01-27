import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import RecoverPassword from '../components/RecoverPassword';
import validate from '../lib/validate-field';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.recoverPassword,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper),
)(reduxForm({ form: 'signup', validate })(RecoverPassword));

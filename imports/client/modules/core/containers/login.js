import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import Login from '../components/login';
import validate from '../lib/validate-field';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.submitLogin,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'login', validate })(Login));

import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import Login, { validate } from '../components/login';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.submitLogin,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'login', validate })(Login));

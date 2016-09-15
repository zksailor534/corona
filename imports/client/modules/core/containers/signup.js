import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import Signup, { validate } from '../components/signup';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.submitSignup,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'signup', validate })(Signup));

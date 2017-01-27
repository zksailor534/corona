import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import Signup from '../components/Signup';
import validate from '../lib/validate-field';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.submitSignup,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper),
)(reduxForm({ form: 'signup', validate })(Signup));

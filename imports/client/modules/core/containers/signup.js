import { useDeps, composeAll } from 'mantra-core';

import Signup from '../components/signup';

export const depsMapper = (context, actions) => ({
  submitSignup: actions.accounts.submitSignup,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(Signup);

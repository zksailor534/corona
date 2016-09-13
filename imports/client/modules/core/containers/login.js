import { useDeps, composeAll } from 'mantra-core';

import Login from '../components/login';

export const depsMapper = (context, actions) => ({
  submitLogin: actions.accounts.submitLogin,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(Login);

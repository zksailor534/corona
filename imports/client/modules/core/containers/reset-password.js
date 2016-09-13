import { useDeps, composeAll } from 'mantra-core';

import ResetPassword from '../components/reset-password';

export const depsMapper = (context, actions) => ({
  resetPassword: actions.accounts.resetPassword,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(ResetPassword);

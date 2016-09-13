import { useDeps, composeAll } from 'mantra-core';

import RecoverPassword from '../components/recover-password';

export const depsMapper = (context, actions) => ({
  recoverPassword: actions.accounts.recoverPassword,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(RecoverPassword);

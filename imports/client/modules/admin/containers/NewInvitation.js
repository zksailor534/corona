import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import NewInvitation from '../components/NewInvitation';
import validate from '../lib/validate-field';

const depsMapper = (context, actions) => ({
  onSubmit: actions.admin.sendInvite,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'newInvite', validate })(NewInvitation));

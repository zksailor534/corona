import { useDeps, compose, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import NewInvitation from '../components/NewInvitation';
import validate from '../lib/validate-field';

const composer = ({ context }, onData) => {
  const { Store } = context();
  onData(null, { show: Store.getState().admin.inviteModal });
  return Store.subscribe(() => {
    const { inviteModal } = Store.getState().admin;
    onData(null, { show: inviteModal });
  });
};

const depsMapper = (context, actions) => ({
  onSubmit: actions.admin.sendInvite,
  close: actions.admin.closeInviteModal,
  context: () => context,
});

export default composeAll(
  compose(composer),
  useDeps(depsMapper)
)(reduxForm({ form: 'newInvite', validate })(NewInvitation));

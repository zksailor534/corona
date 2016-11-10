import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import React from 'react';
import Loading from 'react-loading';
import { reduxForm } from 'redux-form';

import AcceptInvitation from '../components/AcceptInvitation';
import validate from '../lib/validate-field';

const composer = ({ context, params }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('invitations').ready()) {
    const invitation = Collections.Invitations.findOne({ token: params.token });
    if (invitation) {
      onData(null, {
        invitation,
        initialValues: {
          email: invitation.email,
          role: invitation.role,
          token: invitation.token,
        },
      });
    } else {
      onData(null, { invitation });
    }
  }
};

const depsMapper = (context, actions) => ({
  onSubmit: actions.accounts.submitSignup,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, () => <Loading type='spokes' />),
  useDeps(depsMapper)
)(reduxForm({ form: 'acceptInvitation', validate })(AcceptInvitation));

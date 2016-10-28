import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import React from 'react';
import Loading from 'react-loading';

import InvitationList from '../components/InvitationList';

const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('invitations').ready()) {
    onData(null, {
      invitations: Collections.Invitations.find().fetch(),
    });
  }
};

const depsMapper = (context, actions) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, () => <Loading type='spokes' />),
  useDeps(depsMapper)
)(InvitationList);

import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import React from 'react';
import Loading from 'react-loading';

import DocumentsList from '../components/documents-list';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('documents').ready()) {
    const documents = Collections.Documents.find().fetch();
    onData(null, { documents });
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, () => <Loading type='spokes' />),
  useDeps(depsMapper)
)(DocumentsList);

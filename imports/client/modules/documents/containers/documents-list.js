import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import Loading from '/imports/client/modules/core/components/loading.js';
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
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(DocumentsList);

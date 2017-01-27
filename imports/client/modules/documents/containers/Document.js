import { useDeps, composeAll } from 'mantra-core';
import Document from '../components/Document';

export const depsMapper = (context, actions) => ({
  update: actions.documents.update,
  remove: actions.documents.remove,
});

export default composeAll(
  useDeps(depsMapper),
)(Document);

import { useDeps, composeAll } from 'mantra-core';
import AddDocument from '../components/add-document';

export const depsMapper = (context, actions) => ({
  insert: actions.documents.insert,
});

export default composeAll(
  useDeps(depsMapper)
)(AddDocument);

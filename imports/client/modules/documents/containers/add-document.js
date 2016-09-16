import { useDeps, composeAll } from 'mantra-core';
import { reduxForm } from 'redux-form';

import AddDocument from '../components/add-document';
import validate from '../lib/validate-field';

export const depsMapper = (context, actions) => ({
  onSubmit: actions.documents.insert,
  context: () => context,
});

export default composeAll(
  useDeps(depsMapper)
)(reduxForm({ form: 'add-document', validate })(AddDocument));

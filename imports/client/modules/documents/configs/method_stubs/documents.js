/* eslint no-unused-vars: 0 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export default function ({ Collections }) {
  const insertDocument = new ValidatedMethod({
    name: 'documents.insert',
    validate: new SimpleSchema({
      _id: { type: String },
      title: { type: String },
    }).validator(),
    run(document) {
      Collections.Documents.insert(document);
    },
  });

  const updateDocument = new ValidatedMethod({
    name: 'documents.update',
    validate: new SimpleSchema({
      _id: { type: String },
      'update.title': { type: String, optional: true },
    }).validator(),
    run({ _id, update }) {
      Collections.Documents.update(_id, { $set: update });
    },
  });

  const removeDocument = new ValidatedMethod({
    name: 'documents.remove',
    validate: new SimpleSchema({
      _id: { type: String },
    }).validator(),
    run({ _id }) {
      Collections.Documents.remove(_id);
    },
  });
}

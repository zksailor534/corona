/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Documents } from '/imports/lib/collections';
import { insertDocument, updateDocument, removeDocument } from './documents';

describe('Documents methods', () => {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a document into the Documents collection', () => {
    const _id = Meteor.uuid();
    const title = 'You can\'t arrest me, I\'m the Cake Boss!';
    insertDocument.call(
      { _id, title }
    );
    const getDocument = Documents.findOne({ title });
    expect(getDocument.title).to.equal(title);
  });

  it('updates a document in the Documents collection', () => {
    const { _id } = Factory.create('document');
    const title = 'You can\'t arrest me, I\'m the Cake Boss!';
    updateDocument.call(
      {
        _id,
        update: {
          title,
        },
      }
    );

    const getDocument = Documents.findOne(_id);
    expect(getDocument.title).to.equal(title);
  });

  it('removes a document from the Documents collection', () => {
    const { _id } = Factory.create('document');
    removeDocument.call(
      { _id }
    );
    const getDocument = Documents.findOne(_id);
    expect(getDocument).to.equal(undefined);
  });
});

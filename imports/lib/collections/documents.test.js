/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'meteor/practicalmeteor:chai';
import { Documents } from './index';

describe('Documents collection', () => {
  it('registers the collection with Mongo properly', () => {
    expect(typeof Documents).to.equal('object');
  });
});

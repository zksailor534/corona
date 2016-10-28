/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { expect } from 'meteor/practicalmeteor:chai';
import { Invitations } from './index';

describe('Invitations collection', () => {
  it('registers the collection with Mongo properly', () => {
    expect(typeof Invitations).to.equal('object');
  });
});

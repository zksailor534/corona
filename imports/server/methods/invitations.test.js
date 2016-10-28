/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Invitations } from '/imports/lib/collections';
import { sendInvitation } from './invitations';

describe('Invitations methods', () => {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a invitation into the Invitations collection', () => {
    const { email, role, token, date } = Factory.create('invitation');
    sendInvitation.call(
      { email, role, token, date }
    );
    const getInvite = Invitations.findOne({ email });
    expect(getInvite.email).to.equal(email);
    expect(getInvite.role).to.equal(role);
    expect(getInvite.token).to.equal(token);
  });
});

import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SSR } from 'meteor/meteorhacks:ssr';

import { Invitations } from '/imports/lib/collections';

import rateLimit from '../libs/rate-limit.js';

// eslint-disable-next-line no-underscore-dangle
const _prepareEmail = (token) => {
  const domain = Meteor.settings.private.domain;
  const url = `http://${domain}/invite/${token}`;

  // eslint-disable-next-line no-undef
  SSR.compileTemplate('invitation', Assets.getText('email/templates/invitation.html'));
  return SSR.render('invitation', { url });
};

// eslint-disable-next-line no-underscore-dangle
const _sendInvitation = (email, content) => {
  Email.send({
    to: email,
    from: Meteor.settings.private.siteAdmin,
    subject: `Invitation to ${Meteor.settings.private.siteName}`,
    html: content,
  });
};

export const addInvitation = new ValidatedMethod({
  name: 'invitations.add',
  validate: new SimpleSchema({
    email: { type: String },
    token: { type: String },
    role: { type: String },
    date: { type: Date },
    send: { type: Boolean, defaultValue: true, optional: true },
  }).validator(),
  run(invite) {
    if (!Invitations.findOne({ token: invite.token })) Invitations.insert(invite);
    console.log(invite.send);
    if (invite.send) {
      const email = _prepareEmail(invite.token);
      _sendInvitation(invite.email, email);
    }
  },
});

export const removeInvitation = new ValidatedMethod({
  name: 'invitations.remove',
  validate: new SimpleSchema({
    token: { type: String },
  }).validator(),
  run(invite) {
    Invitations.remove({ token: invite.token });
  },
});

export default function () {
  rateLimit({
    methods: [
      addInvitation,
      removeInvitation,
    ],
    limit: 5,
    timeRange: 1000,
  });
}

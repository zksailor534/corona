import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Invitations } from '/imports/lib/collections';

import rateLimit from '../libs/rate-limit.js';

export const sendInvitation = new ValidatedMethod({
  name: 'invitations.send',
  validate: new SimpleSchema({
    email: { type: String },
    token: { type: String },
    role: { type: String },
    date: { type: Date },
  }).validator(),
  run(invite) {
    Invitations.insert(invite);
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
      sendInvitation,
      removeInvitation,
    ],
    limit: 5,
    timeRange: 1000,
  });
}

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

export default function () {
  rateLimit({
    methods: [
      sendInvitation,
    ],
    limit: 5,
    timeRange: 1000,
  });
}

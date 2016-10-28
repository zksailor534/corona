import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Invitations = new Mongo.Collection('Invitations');

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invitations.schema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email to send invitation to.',
  },
  token: {
    type: String,
    label: 'Invitation token.',
  },
  role: {
    type: String,
    label: 'Role to apply to the user.',
  },
  date: {
    type: String,
    label: 'Invitation Date',
  },
});

Invitations.attachSchema(Invitations.schema);

Factory.define('invitation', Invitations, {
  email: () => faker.internet.email(),
  token: () => `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  role: 'user',
  date: () => faker.date.recent(30),
});

export default Invitations;

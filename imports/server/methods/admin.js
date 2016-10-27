import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';

import rateLimit from '../libs/rate-limit.js';

export const setRoleOnUser = new ValidatedMethod({
  name: 'role.set',
  validate: new SimpleSchema({
    id: { type: String },
    role: { type: String },
  }).validator(),
  run(options) {
    Roles.setUserRoles(options.id, [options.role]);
  },
});

export default function () {
  rateLimit({
    methods: [
      setRoleOnUser,
    ],
    limit: 5,
    timeRange: 1000,
  });
}

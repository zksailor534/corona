import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

import Navigation from '../components/navigation';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();

  onData(null, { hasUser: Meteor.user() });
};

// export const depsMapper = (context, actions) => ({
export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Navigation);

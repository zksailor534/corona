import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import AuthenticatedNavigation from '../components/authenticated-navigation';

const mapStateToProps = ({ accounts }) => ({
  user: accounts.user,
});

export const depsMapper = (context, actions) => ({
  submitLogout: actions.accounts.submitLogout,
  context: () => context,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps(depsMapper)
)(AuthenticatedNavigation);

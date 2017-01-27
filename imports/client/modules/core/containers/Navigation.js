import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import Navigation from '../components/Navigation';

const mapStateToProps = ({ accounts, application }) => ({
  loggedIn: accounts.isAuthenticated,
  signup: accounts.signup,
  name: application.siteName,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps(),
)(Navigation);

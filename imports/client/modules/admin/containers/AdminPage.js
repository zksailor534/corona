import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import AdminPage from '../components/AdminPage';

const mapStateToProps = ({ accounts }) => ({
  central: accounts.central,
  signup: accounts.invite,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps()
)(AdminPage);

import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import Layout from '../components/Layout';

const mapStateToProps = ({ application }) => ({
  name: application.siteName,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps(),
)(Layout);

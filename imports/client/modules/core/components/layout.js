import React from 'react';
import { Grid } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Navigation from '../containers/navigation';

const Layout = ({ children }) => (
  <div className="app">
    <Helmet
      titleTemplate="Mantra - %s"
    />
  <Navigation />
    <Grid>
      {children}
    </Grid>
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.node,
};

export default Layout;

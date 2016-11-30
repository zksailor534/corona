import React from 'react';
import { Grid } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Navigation from '../../containers/Navigation';

const Layout = ({ children, name = 'Title' }) => (
  <div className="app">
    <Helmet
      title={name}
    />
    <Navigation />
    <Grid>
      {children}
    </Grid>
  </div>
);

Layout.propTypes = {
  name: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Layout;

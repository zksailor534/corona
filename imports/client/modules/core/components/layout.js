import React from 'react';
import { Grid } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Navigation from './navigation';

const Layout = (props) => (
  <div className="app">
    <Helmet
      titleTemplate="Mantra - %s"
    />
  <Navigation />
    <Grid>
      {props.children}
    </Grid>
  </div>
);

export default Layout;

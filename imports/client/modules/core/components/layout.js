import React from 'react';
import { Grid } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Navigation from '../containers/navigation';

const Layout = ({children}) => {
  return (
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
}

export default Layout;

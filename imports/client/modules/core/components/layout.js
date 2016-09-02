import React from 'react';

import Helmet from 'react-helmet';

const Layout = (props) => (
  <div className="app">
    <Helmet
      titleTemplate="Mantra - %s"
    />
    {props.children}
  </div>
);

export default Layout;
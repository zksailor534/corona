import React from 'react';
import Helmet from 'react-helmet';

import Navigation from '../../containers/Navigation';

const Layout = ({ children, name = 'Title' }) => (
  <div className="app">
    <Helmet
      title={name}
    />
    <Navigation />
    {children}
  </div>
);

Layout.propTypes = {
  name: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Layout;

import React from 'react';

import Helmet from 'react-helmet';
import {Link} from 'react-router';

const HomePage = () => (
  <div className="home-page">
    <Helmet
      title="Home"
    />
    <div>Welcome Home!</div>
    <Link to="profile">Profile Page</Link>
  </div>
);

export default HomePage;
import React from 'react';

import Helmet from 'react-helmet';
import { Link } from 'react-router';

const ProfilePage = () => (
  <div className="profile-page">
    <Helmet
      title="Profile"
    />
    <div>Profile!</div>
    <Link to="/">Home Page</Link>
  </div>
);

export default ProfilePage;

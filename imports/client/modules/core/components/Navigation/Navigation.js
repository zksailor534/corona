import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from '../PublicNavigation';
import AuthenticatedNavigation from '../../containers/AuthenticatedNavigation';


const renderNavigation = (loggedIn, signup = true) => (
  loggedIn ?
    <AuthenticatedNavigation /> :
    <PublicNavigation signup={signup} />
);

const Navigation = ({ loggedIn, signup, name }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">{name}</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      { renderNavigation(loggedIn, signup) }
    </Navbar.Collapse>
  </Navbar>
);

Navigation.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  signup: React.PropTypes.bool,
  name: React.PropTypes.string,
};

export default Navigation;

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from '../PublicNavigation';
import AuthenticatedNavigation from '../../containers/AuthenticatedNavigation';

class Navigation extends React.Component {
  renderNavigation(loggedIn, signup = true) {
    return loggedIn ?
      <AuthenticatedNavigation /> :
      <PublicNavigation signup={signup} />;
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">{this.props.name}</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.renderNavigation(this.props.loggedIn, this.props.signup) }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  signup: React.PropTypes.bool,
  name: React.PropTypes.string,
};

export default Navigation;

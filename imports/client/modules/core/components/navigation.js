import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import PublicNavigation from './public-navigation';
import AuthenticatedNavigation from '../containers/authenticated-navigation';

class Navigation extends React.Component {
  renderNavigation(loggedIn) {
    return loggedIn ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Application Name</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.renderNavigation(this.props.loggedIn) }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};

export default Navigation;

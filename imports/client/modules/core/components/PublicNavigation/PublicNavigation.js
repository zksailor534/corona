import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = ({ signup }) => (
  <Nav pullRight>
    {signup &&
      <LinkContainer to="signup" id="signupLink">
        <NavItem eventKey={ 1 } href="/signup">Sign Up</NavItem>
      </LinkContainer>}
    <LinkContainer to="login" id="loginLink">
      <NavItem eventKey={ 2 } href="/login">Log In</NavItem>
    </LinkContainer>
  </Nav>
);

PublicNavigation.propTypes = {
  signup: React.PropTypes.bool,
};

export default PublicNavigation;

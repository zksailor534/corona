import React from 'react';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const userName = (user) => {
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const adminUser = (user) => (
  user.roles.indexOf('admin') !== -1
);

const AuthenticatedNavigation = ({ submitLogout, user }) => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/documents">
        <NavItem eventKey={ 2 } href="/documents">Documents</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName(user) } id="basic-nav-dropdown">
        {adminUser(user) && (<LinkContainer to="/admin">
          <MenuItem eventKey={ 3.1 } >Admin</MenuItem>
        </LinkContainer>)}
        <MenuItem eventKey={ 3.2 } onClick={ () => submitLogout() }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  submitLogout: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
};

export default AuthenticatedNavigation;

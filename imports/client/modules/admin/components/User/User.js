import React from 'react';
import { Button } from 'react-bootstrap';

import './User.css';

const User = ({ user, changeRole, role, currentUser, removeUser }) => {
  const id = user._id;
  const firstName = user.profile.name.first;
  const lastName = user.profile.name.last;
  const email = user.emails[0].address;

  const handleRoleChange = (e) => {
    changeRole(e.target.id.replace(/.*-/, ''), e.target.value);
  };

  const hideButton = () => {
    if (currentUser) {
      return {
        display: 'none',
      };
    }
    return {};
  };

  return (
    <tr className='user-table'>
      <td style={{ verticalAlign: 'middle' }}>
        {currentUser && <label className='label label-success'>You!</label>}
        {'  '}
        {email}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {firstName}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {lastName}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <select
          id={`role-${id}`}
          defaultValue={role}
          className='form-control'
          onChange={handleRoleChange}
          disabled={currentUser}
        >
          <option value='admin'>Admin</option>
          <option value='manager'>Manager</option>
          <option value='user'>User</option>
        </select>
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <Button
          onClick={() => removeUser(id)}
          style={hideButton()}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: React.PropTypes.object,
  role: React.PropTypes.string,
  changeRole: React.PropTypes.func,
  currentUser: React.PropTypes.bool,
  removeUser: React.PropTypes.func,
};

export default User;

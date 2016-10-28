import React from 'react';

import './User.css';

const User = ({ user, changeRole, role, currentUser }) => {
  const id = user._id;
  const firstName = user.profile.name.first;
  const lastName = user.profile.name.last;
  const email = user.emails[0].address;

  const handleRoleChange = (e) => {
    changeRole(e.target.id.replace(/.*-/, ''), e.target.value);
  };

  return (
    <tr className='user-table'>
      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        {currentUser ?
          <label className='label label-success'>You!</label> :
          <input type='checkbox' aria-label={`${id}-checkbox`} />}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {firstName}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {lastName}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {email}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <select
          id={`role-${id}`}
          defaultValue={role}
          className='form-control'
          onChange={handleRoleChange}
        >
          <option value='admin'>Admin</option>
          <option value='manager'>Manager</option>
          <option value='user'>User</option>
        </select>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: React.PropTypes.object,
  role: React.PropTypes.string,
  changeRole: React.PropTypes.func,
  currentUser: React.PropTypes.bool,
};

export default User;

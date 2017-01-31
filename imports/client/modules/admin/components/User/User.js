import React from 'react';
import { Button } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import Select from 'react-select';

const User = ({ user, changeRole, roles, currentUser, removeUser }) => {
  const id = user._id;
  const firstName = user.profile.name.first;
  const lastName = user.profile.name.last;
  const email = user.emails[0].address;

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
  ];

  const handleRoleChange = (value) => {
    const r = [];
    value.map(v => r.push(v.value));
    changeRole(id, r);
  };

  const hideButton = () => {
    if (currentUser === id) {
      return { display: 'none' };
    }
    return {};
  };

  return (
    <div className='tblrow'>
      <div className='tblcell'>
        {(currentUser === id) && <label className='label label-success'>You!</label>}
        {'  '}
        {email}
      </div>
      <div className='tblcell hideSm'>
        {firstName}
      </div>
      <div className='tblcell hideSm'>
        {lastName}
      </div>
      <div className='tblcell'>
        <Select
          name={`role-${id}`}
          disabled={!Roles.userIsInRole(currentUser, 'admin')}
          options={roleOptions}
          onChange={handleRoleChange}
          value={roles}
          multi
        />
      </div>
      <div className='tblcell'>
        <Button
          onClick={() => removeUser(id)}
          style={hideButton()}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: React.PropTypes.object,
  roles: React.PropTypes.array,
  changeRole: React.PropTypes.func,
  currentUser: React.PropTypes.string,
  removeUser: React.PropTypes.func,
};

export default User;

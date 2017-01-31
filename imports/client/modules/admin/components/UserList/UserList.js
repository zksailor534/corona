import React from 'react';
import {
  Alert,
  Button,
} from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import User from '../User';

const UserList = (props) => {
  const { changeRole, users, currentUser, removeUser, openModal } = props;

  const listUsers = () => (
    users.map((u) => {
      const roles = [];
      Roles.getRolesForUser(u).map(r => roles.push({ value: r, label: r }));
      return (
        <User
          key={u._id}
          user={u}
          roles={roles}
          changeRole={changeRole}
          currentUser={currentUser}
          removeUser={removeUser}
        />
      );
    })
  );

  return (
    <div>
      <div className='page-header clearfix'>
        <div className='pull-right'>
          <Button
            disabled={!Roles.userIsInRole(currentUser, 'admin')}
            onClick={openModal}
          >
            New User
          </Button>
        </div>
      </div>
      {users.length > 0 ?
        <table className='table table-hover'>
          <thead>
            <tr>
              <th style={({ width: '22%' })} >Email Address</th>
              <th style={({ width: '15%' })} >First Name</th>
              <th style={({ width: '15%' })} >Last Name</th>
              <th style={({ width: '35%' })} >Role</th>
              <th style={({ width: '10%' })} ></th>
            </tr>
          </thead>
          <tbody>
            {listUsers()}
          </tbody>
        </table> :
        <Alert bsStyle='warning'>No users found.</Alert>}
    </div>
  );
};

UserList.propTypes = {
  changeRole: React.PropTypes.func,
  removeUser: React.PropTypes.func,
  users: React.PropTypes.array,
  currentUser: React.PropTypes.string,
  openModal: React.PropTypes.func,
  dirty: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default UserList;

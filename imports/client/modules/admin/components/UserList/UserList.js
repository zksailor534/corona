import React from 'react';
import {
  Alert,
} from 'react-bootstrap';
import User from '../User';

const UserList = (props) => {
  const { changeRole, users, currentUser, removeUser } = props;

  const listUsers = () => {
    let role = 'user';
    return users.map((u) => {
      if (u.roles) {
        role = u.roles[0];
      } else {
        role = 'user';
      }
      return (
        <User
          key={u._id}
          user={u}
          role={role}
          changeRole={changeRole}
          currentUser={u._id === currentUser}
          removeUser={removeUser}
        />
      );
    });
  };

  return (
    <div>
      <div className='page-header clearfix'>
        <h4 className='pull-left'>Users</h4>
      </div>
      {users.length > 0 ?
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th style={({ width: '25%' })} >Email Address</th>
                <th style={({ width: '20%' })} >First Name</th>
                <th style={({ width: '20%' })} >Last Name</th>
                <th style={({ width: '25%' })} >Role</th>
                <th style={({ width: '10%' })} ></th>
              </tr>
            </thead>
            <tbody>
              {listUsers()}
            </tbody>
          </table>
        </div> :
        <Alert bsStyle='warning'>No users found.</Alert>}
    </div>
  );
};

UserList.propTypes = {
  changeRole: React.PropTypes.func,
  removeUser: React.PropTypes.func,
  users: React.PropTypes.array,
  currentUser: React.PropTypes.string,
  dirty: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default UserList;

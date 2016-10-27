import React from 'react';
import {
  Alert,
  Button,
} from 'react-bootstrap';
import User from '../User';

import './UserList.css';

const UserList = (props) => {
  const { changeRole, users } = props;

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
        />
      );
    });
  };

  return (
    <div>
      <div className='page-header clearfix'>
        <h4 className='pull-left'>Users</h4>
        <div className='pull-right'>
          <Button className='btn-spaced' disabled>Save</Button>
          <Button disabled>Remove</Button>
        </div>
      </div>
      {users.length > 0 ?
        <div className='table-responsive'>
          <table className='table table-hover'>
            <colgroup>
              <col style={({ width: '5%' })} />
              <col style={({ width: '20%' })} />
              <col style={({ width: '20%' })} />
              <col style={({ width: '25%' })} />
              <col style={({ width: '30%' })} />
            </colgroup>
            <thead>
              <tr>
                <th style={({ width: '5%' })} ></th>
                <th style={({ width: '20%' })} >First Name</th>
                <th style={({ width: '20%' })} >Last Name</th>
                <th style={({ width: '25%' })} >Email Address</th>
                <th style={({ width: '30%' })} >Role</th>
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
  users: React.PropTypes.array,
  dirty: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default UserList;

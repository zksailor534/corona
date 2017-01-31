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
        <div className='bstrap-table'>
          <div className='tblheading'>
            <div className='tblrow'>
              <div className='tblcell' style={({ width: '22%' })} >Email Address</div>
              <div className='tblcell hideSm' style={({ width: '15%' })} >First Name</div>
              <div className='tblcell hideSm' style={({ width: '15%' })} >Last Name</div>
              <div className='tblcell' style={({ width: '35%' })} >Role</div>
              <div className='tblcell' style={({ width: '10%' })} ></div>
            </div>
          </div>
          <div className='tblbody'>
            {listUsers()}
          </div>
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
  openModal: React.PropTypes.func,
  dirty: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
};

export default UserList;

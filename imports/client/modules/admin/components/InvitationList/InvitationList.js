import React from 'react';
import {
  Alert,
  Button,
} from 'react-bootstrap';

import Invite from '../Invite';

const InvitationList = (props) => {
  const { invitations, removeInvite, openModal } = props;

  const listInvites = () => (
    invitations.map(i => (
      <Invite
        key={i.token}
        email={i.email}
        token={i.token}
        role={i.role}
        date={i.date.toString()}
        removeInvite={removeInvite}
      />
    ))
  );

  return (
    <div>
      <div className='page-header clearfix'>
        <h4 className='pull-left'>Invitations</h4>
        <div className='pull-right'>
          <Button onClick={openModal}>New Invitation</Button>
        </div>
      </div>
      {invitations.length > 0 ?
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th style={({ width: '25%' })} >Email Address</th>
                <th style={({ width: '25%' })} >Role</th>
                <th style={({ width: '40%' })} >Date</th>
                <th style={({ width: '10%' })} ></th>
              </tr>
            </thead>
            <tbody>
              {listInvites()}
            </tbody>
          </table>
        </div> :
        <Alert bsStyle='warning'>No invitations found.</Alert>}
    </div>
  );
};

InvitationList.propTypes = {
  invitations: React.PropTypes.array,
  removeInvite: React.PropTypes.func,
  openModal: React.PropTypes.func,
};

export default InvitationList;

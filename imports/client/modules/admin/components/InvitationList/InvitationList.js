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
        <div className='pull-right'>
          <Button onClick={openModal}>New Invitation</Button>
        </div>
      </div>
      {invitations.length > 0 ?
        <div className='bstrap-table'>
          <div className='tblheading'>
            <div className='tblrow'>
              <div className='tblcell' style={({ width: '25%' })} >Email Address</div>
              <div className='tblcell' style={({ width: '25%' })} >Role</div>
              <div className='tblcell' style={({ width: '40%' })} >Date</div>
              <div className='tblcell' style={({ width: '10%' })} ></div>
            </div>
          </div>
          <div className='tblbody'>
            {listInvites()}
          </div>
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

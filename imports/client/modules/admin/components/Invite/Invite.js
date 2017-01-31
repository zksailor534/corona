import React from 'react';
import { Button } from 'react-bootstrap';

const Invite = ({ email, token, role, date, removeInvite }) => (
  <div id={token} className='tblrow'>
    <div id={`email-${token}`} className='tblcell'>
      {email}
    </div>
    <div id={`role-${token}`} className='tblcell'>
      {role}
    </div>
    <div id={`date-${token}`} className='tblcell'>
      {date}
    </div>
    <div className='tblcell'>
      <Button onClick={() => removeInvite({ token })}>Remove</Button>
    </div>
  </div>
);

Invite.propTypes = {
  email: React.PropTypes.string,
  token: React.PropTypes.string,
  role: React.PropTypes.string,
  date: React.PropTypes.string,
  removeInvite: React.PropTypes.func,
};

export default Invite;

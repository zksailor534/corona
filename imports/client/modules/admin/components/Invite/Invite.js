import React from 'react';
import { Button } from 'react-bootstrap';

import './Invite.css';

const Invite = ({ email, token, role, date, removeInvite }) => (
  <tr id={token} className='user-table'>
    <td id={`email-${token}`} style={{ verticalAlign: 'middle' }}>
      {email}
    </td>
    <td id={`role-${token}`} style={{ verticalAlign: 'middle' }}>
      {role}
    </td>
    <td id={`date-${token}`} style={{ verticalAlign: 'middle' }}>
      {date}
    </td>
    <td style={{ verticalAlign: 'middle' }}>
      <Button onClick={() => removeInvite({ token })}>Remove</Button>
    </td>
  </tr>
);

Invite.propTypes = {
  email: React.PropTypes.string,
  token: React.PropTypes.string,
  role: React.PropTypes.string,
  date: React.PropTypes.string,
  removeInvite: React.PropTypes.func,
};

export default Invite;

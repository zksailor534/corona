import React from 'react';
import { Button } from 'react-bootstrap';

import './Invite.css';

const Invite = ({ email, role, date }) => (
  <tr className='user-table'>
    <td style={{ verticalAlign: 'middle' }}>
      {email}
    </td>
    <td style={{ verticalAlign: 'middle' }}>
      {role}
    </td>
    <td style={{ verticalAlign: 'middle' }}>
      {date}
    </td>
    <td style={{ verticalAlign: 'middle' }}>
      <Button>Remove</Button>
    </td>
  </tr>
);

Invite.propTypes = {
  email: React.PropTypes.string,
  role: React.PropTypes.string,
  date: React.PropTypes.string,
  deleteInvite: React.PropTypes.func,
};

export default Invite;

import React from 'react';
import {
  Alert,
  Button,
} from 'react-bootstrap';

import './InvitationList.css';

const InvitationList = (props) => {
  const { invitations } = props;

  const listInvites = () => (
    invitations.map((i) => (
      <tr>
        <td>{i.email}</td>
        <td>{i.role}</td>
        <td>{i.date}</td>
      </tr>
    ))
  );

  return (
    <div>
      <div className='page-header clearfix'>
        <h4 className='pull-left'>Invitations</h4>
        <div className='pull-right'>
          <Button disabled>Send Invitation</Button>
        </div>
      </div>
      {invitations.length > 0 ?
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th style={({ width: '40%' })} >Email Address</th>
                <th style={({ width: '30%' })} >Role</th>
                <th style={({ width: '30%' })} >Date</th>
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
};

export default InvitationList;

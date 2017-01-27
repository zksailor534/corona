import React from 'react';
import UserList from '../../containers/UserList';
import NewUser from '../../containers/NewUser';
import InvitationList from '../../containers/InvitationList';
import NewInvitation from '../../containers/NewInvitation';

const AdminPage = ({ central, invite }) => (
  <div className="container">
    <UserList />
    {central && <NewUser />}
    {invite && <InvitationList />}
    {invite && <NewInvitation />}
  </div>
);

AdminPage.propTypes = {
  central: React.PropTypes.bool,
  invite: React.PropTypes.bool,
};

export default AdminPage;

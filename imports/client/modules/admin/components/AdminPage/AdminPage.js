import React from 'react';
import UserList from '../../containers/UserList';
import InvitationList from '../../containers/InvitationList';
import NewInvitation from '../../containers/NewInvitation';

const AdminPage = () => (
  <div>
    <UserList />
    <InvitationList />
    <NewInvitation />
  </div>
);

export default AdminPage;

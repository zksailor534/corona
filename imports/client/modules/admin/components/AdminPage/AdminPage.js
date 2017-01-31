import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import UserList from '../../containers/UserList';
import NewUser from '../../containers/NewUser';
import InvitationList from '../../containers/InvitationList';
import NewInvitation from '../../containers/NewInvitation';

const AdminPage = ({ central, invite }) => (
  <div className="container">
    <Tabs defaultActiveKey={1} id="admin-tab-menu">
      <Tab eventKey={1} title="Users">
        <UserList />
        {central && <NewUser />}
      </Tab>
      {invite &&
        <Tab eventKey={2} title="Invitations">
          <InvitationList />
          <NewInvitation />
        </Tab>
      }
    </Tabs>
  </div>
);

AdminPage.propTypes = {
  central: React.PropTypes.bool,
  invite: React.PropTypes.bool,
};

export default AdminPage;

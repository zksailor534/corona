import React from 'react';
import UserList from '../../containers/UserList';
import InvitationList from '../../containers/InvitationList';
import NewInvitation from '../../containers/NewInvitation';

class AdminPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inviteModal: false,
    };
  }

  toggleModal() {
    this.setState({
      inviteModal: !this.state.inviteModal,
    });
  }

  render() {
    return (
      <div>
        <UserList />
        <InvitationList toggleModal={this.toggleModal.bind(this)} />
        <NewInvitation
          show={this.state.inviteModal}
          close={this.toggleModal.bind(this)}
        />
      </div>
    );
  }
}

export default AdminPage;

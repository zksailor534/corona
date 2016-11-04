import { Random } from 'meteor/random';

// ! ------------------------------------------
// Redux action creators
// ! ------------------------------------------
const roleChangeRequest = (id) => ({
  type: 'ROLE_CHANGE_REQUEST',
  id,
});

const roleChangeError = (id) => ({
  type: 'ROLE_CHANGE_ERROR',
  id,
});

const roleChangeSuccess = (id) => ({
  type: 'ROLE_CHANGE_SUCCESS',
  id,
});

const openInvite = () => ({
  type: 'OPEN_INVITE_MODAL',
});

const closeInvite = () => ({
  type: 'CLOSE_INVITE_MODAL',
});

export default {
  // ! ------------------------------------------
  // Expose bound redux actions
  // ! ------------------------------------------
  openInviteModal({ Store }) { Store.dispatch(openInvite()); },
  closeInviteModal({ Store }) { Store.dispatch(closeInvite()); },

  // ! ------------------------------------------
  // Change User Role
  // ! ------------------------------------------
  changeRole({ Meteor, Store, Bert }, id, role) {
    const { dispatch } = Store;

    // Change state to role change request
    dispatch(roleChangeRequest(id));

    // Call role change method
    Meteor.call(
      'role.set',
      {
        id,
        role,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
          // Change state to role change error
          dispatch(roleChangeError(id));
        } else {
          Bert.alert('Role changed!', 'success');
          // Change state to successful login
          dispatch(roleChangeSuccess(id));
        }
      }
    );
  },

  // ! ------------------------------------------
  // Send User Invite
  // ! ------------------------------------------
  sendInvite({ Meteor, Bert }, { email, role }) {
    // Generate invite token and date
    const token = Random.hexString(16);
    const date = new Date();

    // Call send invitation method
    Meteor.call(
      'invitations.send',
      {
        email,
        token,
        role: role.value,
        date,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Role changed!', 'success');
        }
      }
    );
  },

  // ! ------------------------------------------
  // Remove User Invite
  // ! ------------------------------------------
  removeInvite({ Meteor, Bert }, { token }) {
    // Call remove invitation method
    Meteor.call(
      'invitations.remove',
      {
        token,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Invite removed!', 'success');
        }
      }
    );
  },
};

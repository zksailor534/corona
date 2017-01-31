import { Random } from 'meteor/random';

// ! ------------------------------------------
// Redux action creators
// ! ------------------------------------------
const roleChangeRequest = id => ({
  type: 'ROLE_CHANGE_REQUEST',
  id,
});

const roleChangeError = id => ({
  type: 'ROLE_CHANGE_ERROR',
  id,
});

const roleChangeSuccess = id => ({
  type: 'ROLE_CHANGE_SUCCESS',
  id,
});

const removeUserRequest = id => ({
  type: 'REMOVE_USER_REQUEST',
  id,
});

const removeUserError = id => ({
  type: 'REMOVE_USER_ERROR',
  id,
});

const removeUserSuccess = id => ({
  type: 'REMOVE_USER_SUCCESS',
  id,
});

const openNewUser = () => ({
  type: 'OPEN_NEW_USER_MODAL',
});

const closeNewUser = () => ({
  type: 'CLOSE_NEW_USER_MODAL',
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
  openNewUserModal({ Store }) { Store.dispatch(openNewUser()); },
  closeNewUserModal({ Store }) { Store.dispatch(closeNewUser()); },
  openInviteModal({ Store }) { Store.dispatch(openInvite()); },
  closeInviteModal({ Store }) { Store.dispatch(closeInvite()); },

  // ! ------------------------------------------
  // Change User Role
  // ! ------------------------------------------
  changeRole({ Meteor, Store, Bert }, id, roles) {
    const { dispatch } = Store;

    // Change state to role change request
    dispatch(roleChangeRequest(id));

    // Call role change method
    Meteor.call(
      'role.set',
      {
        id,
        roles,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
          // Change state to role change error
          dispatch(roleChangeError(id));
        } else {
          Bert.alert('Roles changed!', 'success');
          // Change state to successful login
          dispatch(roleChangeSuccess(id));
        }
      },
    );
  },

  // ! ------------------------------------------
  // Remove User
  // ! ------------------------------------------
  removeUser({ Meteor, Store, Bert }, id) {
    const { dispatch } = Store;

    // Change state to remove user request
    dispatch(removeUserRequest(id));

    // Call remove user method
    Meteor.call(
      'user.remove',
      {
        id,
        requestingUser: Meteor.userId(),
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
          // Change state to remove user error
          dispatch(removeUserError(id));
        } else {
          Bert.alert('User Removed!', 'success');
          // Change state to successful login
          dispatch(removeUserSuccess(id));
        }
      },
    );
  },

  // ! ------------------------------------------
  // Send User Invite
  // ! ------------------------------------------
  sendInvite({ Meteor, Store, Bert }, { email, roles }) {
    const { dispatch } = Store;

    // Generate invite token and date
    const token = Random.hexString(16);
    const date = new Date();

    // Call send invitation method
    Meteor.call(
      'invitations.add',
      {
        email,
        token,
        roles,
        date,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Invite sent!', 'success');
          dispatch(closeInvite());
        }
      },
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
      },
    );
  },
};

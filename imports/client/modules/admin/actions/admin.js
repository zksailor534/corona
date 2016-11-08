import { browserHistory } from 'react-router';
import { Random } from 'meteor/random';

// ! ------------------------------------------
// Redux action creators
// ! ------------------------------------------
const requestSignup = () => ({
  type: 'SIGNUP_REQUEST',
});

const receiveSignup = (user) => ({
  type: 'SIGNUP_SUCCESS',
  user,
});

const signupError = () => ({
  type: 'SIGNUP_FAILURE',
});

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

const removeUserRequest = (id) => ({
  type: 'REMOVE_USER_REQUEST',
  id,
});

const removeUserError = (id) => ({
  type: 'REMOVE_USER_ERROR',
  id,
});

const removeUserSuccess = (id) => ({
  type: 'REMOVE_USER_SUCCESS',
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
  // Signup from Invite
  // ! ------------------------------------------
  signupFromInvite({ Meteor, Store, Bert }, props) {
    const { dispatch } = Store;
    const { email, passwordCreate, firstName, lastName, token, role } = props;

    // Change state to signup request
    dispatch(requestSignup());

    const user = {
      email,
      password: passwordCreate,
      profile: {
        name: {
          first: firstName,
          last: lastName,
        },
      },
      roles: [role],
      token,
    };

    Meteor.call(
      'user.add',
      user, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
          // Change state to signup error
          dispatch(signupError());
        } else {
          // Change state to successful login
          dispatch(receiveSignup(response));

          // Announce success
          Bert.alert(`Welcome ${firstName}!`, 'success');

          // Redirect to home screen
          browserHistory.push('/');
        }
      }
    );
  },

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
      }
    );
  },

  // ! ------------------------------------------
  // Send User Invite
  // ! ------------------------------------------
  sendInvite({ Meteor, Store, Bert }, { email, role }) {
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
        role: role.value,
        date,
        send: true,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Invite sent!', 'success');
          dispatch(closeInvite());
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

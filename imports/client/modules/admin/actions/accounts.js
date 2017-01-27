import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

// ! ------------------------------------------
// Redux action creators
// ! ------------------------------------------
const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

const loginSuccess = user => ({
  type: 'LOGIN_SUCCESS',
  user,
});

const loginError = () => ({
  type: 'LOGIN_FAILURE',
});

const logoutRequest = () => ({
  type: 'LOGOUT_REQUEST',
});

const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
});

const signupRequest = () => ({
  type: 'SIGNUP_REQUEST',
});

const signupSuccess = user => ({
  type: 'SIGNUP_SUCCESS',
  user,
});

const signupError = () => ({
  type: 'SIGNUP_FAILURE',
});

const resetPasswordRequest = () => ({
  type: 'RESET_PASSWORD_REQUEST',
});

const resetPasswordSuccess = user => ({
  type: 'RESET_PASSWORD_SUCCESS',
  user,
});

const resetPasswordError = () => ({
  type: 'RESET_PASSWORD_FAILURE',
});

export default {
// ! ------------------------------------------
// Submit Login
// ! ------------------------------------------
  submitLogin({ Meteor, Store, Bert }, { email, password }) {
    const { dispatch } = Store;

    // Change state to login request
    dispatch(loginRequest());

    // Call login procedure
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
        // Change state to login error
        dispatch(loginError());
      } else {
        Bert.alert('Logged in!', 'success');
        // Change state to successful login
        dispatch(loginSuccess(Meteor.user()));

        // Redirect to next page
        const state = Store.getState().routing.locationBeforeTransitions.state;
        if (state && state.nextPathname) {
          browserHistory.push(state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  },

  // ! ------------------------------------------
  // Submit Logout
  // ! ------------------------------------------
  submitLogout({ Meteor, Store, Bert }) {
    const { dispatch } = Store;

    // Change state to logout request
    dispatch(logoutRequest());

    // Call logout procedure
    Meteor.logout((error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged out!', 'success');
        // Change state to successful logout
        dispatch(logoutSuccess());

        // Redirect to login screen
        browserHistory.push('/login');
      }
    });
  },

  // ! ------------------------------------------
  // Submit Signup from Invite or Form
  // ! ------------------------------------------
  submitSignup({ Meteor, Store, Bert }, props) {
    const { dispatch } = Store;
    const { email, passwordCreate, firstName, lastName, token = null, role = 'user' } = props;

    // Change state to signup request
    dispatch(signupRequest());

    const user = {
      email,
      password: passwordCreate,
      profile: {
        name: {
          first: firstName,
          last: lastName,
        },
      },
      roles: [role], // TODO change role to roles array
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
          dispatch(signupSuccess(response));

          // Announce success
          Bert.alert(`Welcome ${firstName}!`, 'success');

          // Redirect to home screen
          browserHistory.push('/');
        }
      },
    );
  },

  // ! ------------------------------------------
  // Recover Password
  // ! ------------------------------------------
  recoverPassword({ Bert }, { email }) {
    // Call forgot password procedure
    Accounts.forgotPassword({
      email,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Check your inbox for a reset link!', 'success');
      }
    });
  },

  // ! ------------------------------------------
  // Reset Password
  // ! ------------------------------------------
  resetPassword({ Meteor, Store, Bert }, data) {
    const { token, password } = data;
    const { dispatch } = Store;

    // Change state to password reset request
    dispatch(resetPasswordRequest());

    // Call reset password procedure
    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        // Change state to password reset error
        dispatch(resetPasswordError());
      } else {
        Bert.alert('Password reset!', 'success');
        // Change state to successful password reset
        dispatch(resetPasswordSuccess(Meteor.user()));

        // Redirect to home screen
        browserHistory.push('/');
      }
    });
  },
};

import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

const requestLogin = () => ({
  type: 'LOGIN_REQUEST',
});

const receiveLogin = (user) => ({
  type: 'LOGIN_SUCCESS',
  user,
});

const loginError = () => ({
  type: 'LOGIN_FAILURE',
});

const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
});

const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
});

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

const requestResetPassword = () => ({
  type: 'RESET_PASSWORD_REQUEST',
});

const receiveResetPassword = (user) => ({
  type: 'RESET_PASSWORD_SUCCESS',
  user,
});

const resetPasswordError = () => ({
  type: 'RESET_PASSWORD_FAILURE',
});

export default {
  submitLogin({ Meteor, Store, Bert }, { email, password }) {
    const { dispatch } = Store;

    // Change state to login request
    dispatch(requestLogin());

    // Call login procedure
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
        // Change state to login error
        dispatch(loginError());
      } else {
        Bert.alert('Logged in!', 'success');
        // Change state to successful login
        dispatch(receiveLogin(Meteor.user()));

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
  submitLogout({ Meteor, Store, Bert }) {
    const { dispatch } = Store;

    // Change state to logout request
    dispatch(requestLogout());

    // Call logout procedure
    Meteor.logout((error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged out!', 'success');
        // Change state to successful logout
        dispatch(receiveLogout());

        // Redirect to login screen
        browserHistory.push('/login');
      }
    });
  },
  submitSignup({ Meteor, Store, Bert }, { email, password, profile }) {
    const { dispatch } = Store;

    // Change state to signup request
    dispatch(requestSignup());

    const user = {
      email,
      password,
      profile,
    };

    // Call signup procedure
    Accounts.createUser(user, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        // Change state to signup error
        dispatch(signupError());
      } else {
        Bert.alert('Welcome!', 'success');
        // Change state to successful login
        dispatch(receiveSignup(Meteor.user()));

        // Redirect to home screen
        browserHistory.push('/');
      }
    });
  },
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
  resetPassword({ Meteor, Store, Bert }, { token, password }) {
    const { dispatch } = Store;

    // Change state to password reset request
    dispatch(requestResetPassword());

    // Call reset password procedure
    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        // Change state to password reset error
        dispatch(resetPasswordError());
      } else {
        Bert.alert('Password reset!', 'success');
        // Change state to successful password reset
        dispatch(receiveResetPassword(Meteor.user()));

        // Redirect to home screen
        browserHistory.push('/');
      }
    });
  },
};

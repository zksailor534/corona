import { Bert } from 'meteor/themeteorchef:bert';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

const requestLogin = () => ({
  type: 'LOGIN_REQUEST',
});

const receiveLogin = (user) => ({
  type: 'LOGIN_SUCCESS',
  user,
});

const loginError = (message) => ({
  type: 'LOGIN_FAILURE',
  message,
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

const signupError = (message) => ({
  type: 'SIGNUP_FAILURE',
  message,
});

export default {
  submitLogin({ Meteor, Store }, { email, password, component }) {
    const { dispatch } = Store;

    // Change state to login request
    dispatch(requestLogin());

    // Call login procedure
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
        // Change state to login error
        dispatch(loginError(error.reason));
      } else {
        Bert.alert('Logged in!', 'success');
        // Change state to successful login
        dispatch(receiveLogin(Meteor.user()));

        const { location } = component.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  },
  submitLogout({ Meteor, Store }) {
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
  submitSignup({ Meteor, Store }, { email, password, profile }) {
    const { dispatch } = Store;

    // Change state to signup request
    dispatch(requestSignup());

    const user = {
      email,
      password,
      profile,
    };

    // Call login procedure
    Accounts.createUser(user, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        // Change state to signup error
        dispatch(signupError(error.reason));
      } else {
        Bert.alert('Welcome!', 'success');
        // Change state to successful login
        dispatch(receiveSignup(Meteor.user()));

        // Redirect to home screen
        browserHistory.push('/');
      }
    });
  },
};

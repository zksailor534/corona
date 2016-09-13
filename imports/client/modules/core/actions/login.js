import { Bert } from 'meteor/themeteorchef:bert';
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
};

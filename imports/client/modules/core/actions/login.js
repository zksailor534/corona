import { Bert } from 'meteor/themeteorchef:bert';
import { browserHistory } from 'react-router';

const requestLogin = () => ({
  type: 'LOGIN_REQUEST',
});

const receiveLogin = (user) => ({
  type: 'LOGIN_SUCCESS',
  userId: user,
});

const loginError = (message) => ({
  type: 'LOGIN_FAILURE',
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
        dispatch(receiveLogin(Meteor.userId()));

        const { location } = component.props;
        if (location.state && location.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  },
};

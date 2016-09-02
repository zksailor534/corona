import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

const handleRecovery = (component) => {
  Accounts.forgotPassword({
    email: getInputValue(component.refs.emailAddress),
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'warning');
    } else {
      Bert.alert('Check your inbox for a reset link!', 'success');
    }
  });
};

export const handleRecoverPassword = (options) => {
  handleRecovery(options.component);
};

import zxcvbn from 'zxcvbn';

const validate = values => {
  const errors = {};

  // First Name
  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  // Last Name
  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  // Email
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Password for sign in
  if (!values.password) {
    errors.password = 'Required';
  }

  // Password creation
  if (!values.passwordCreate) {
    errors.passwordCreate = {
      message: 'Required',
      state: 'error',
    };
  } else {
    switch (zxcvbn(values.passwordCreate).score) {
      case 0:
        errors.passwordCreate = {
          message: 'Password too weak',
          state: 'error',
        };
        break;
      case 1:
        errors.passwordCreate = {
          message: 'Password very weak',
          state: 'error',
        };
        break;
      case 2:
        errors.passwordCreate = {
          message: 'Password somewhat weak',
          state: 'warning',
        };
        break;
      default:
        break;
    }
  }
  return errors;
};

export default validate;

import zxcvbn from 'zxcvbn';

const validate = values => {
  const errors = {};

  // ! ------------------------------------------
  // Email (use inputField)
  // ! ------------------------------------------
  if (!values.email) {
    errors.email = {
      message: 'Required',
      state: 'error',
    };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address',
      state: 'error',
    };
  }

  // ! ------------------------------------------
  // Role (use selectField)
  // ! ------------------------------------------
  if (!values.role) {
    errors.role = {
      message: 'Required',
      state: 'error',
    };
  }

  // ! ------------------------------------------
  // Password creation (use passwordField)
  // ! ------------------------------------------
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

  // ! ------------------------------------------
  // Password confirmation (use inputField)
  // ! ------------------------------------------
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  } else if (!errors.passwordCreate) {
    if (values.passwordCreate !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords must match!';
    }
  }

  return errors;
};

export default validate;

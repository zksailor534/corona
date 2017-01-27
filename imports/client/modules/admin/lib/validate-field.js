import zxcvbn from 'zxcvbn';

const validate = (values) => {
  const errors = {};

  // ! ------------------------------------------
  // First Name (use textField)
  // ! ------------------------------------------
  if (!values.firstName) {
    errors.firtName = {
      message: 'Required',
      state: 'error',
    };
  }

  // ! ------------------------------------------
  // Last Name (use textField)
  // ! ------------------------------------------
  if (!values.lastName) {
    errors.lastName = {
      message: 'Required',
      state: 'error',
    };
  }

  // ! ------------------------------------------
  // Email (use textField)
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
  // Password for sign in (use textField)
  // ! ------------------------------------------
  if (!values.password) {
    errors.password = {
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
  // Password confirmation (use textField)
  // ! ------------------------------------------
  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required';
  } else if (!errors.passwordCreate) {
    if (values.passwordCreate !== values.passwordConfirm) {
      errors.passwordConfirm = 'Passwords must match!';
    }
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

  return errors;
};

export default validate;

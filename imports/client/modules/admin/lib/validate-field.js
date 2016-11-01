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

  return errors;
};

export default validate;

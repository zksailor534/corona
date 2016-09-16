const validate = values => {
  const errors = {};

  // ! ------------------------------------------
  // Title (use titleField)
  // ! ------------------------------------------
  if (!values.title) {
    errors.title = {
      message: 'Required',
      state: 'error',
    };
  }

  return errors;
};

export default validate;

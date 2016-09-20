import React from 'react';
import {
  FormGroup,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

export const titleField = ({ input, name, type, placeholder, meta: { submitting, error } }) => {
  let state = null;
  let message = null;
  if (submitting && error) {
    state = error.state;
    message = error.message;
  }

  return (
    <FormGroup
      controlId={name}
      validationState={state}
    >
      <FormControl
        {...input}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    {message && <HelpBlock>{message}</HelpBlock> }
    </FormGroup>
  );
};

titleField.propTypes = {
  input: React.PropTypes.object,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  error: React.PropTypes.object,
  meta: React.PropTypes.object,
};

export default titleField;

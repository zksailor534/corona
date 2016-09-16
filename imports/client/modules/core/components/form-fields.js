import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';

export const inputField = ({ input, name, label, type, meta: { touched, error } }) => {
  let valid = null;
  if (touched) {
    if (error) {
      valid = 'error';
    } else {
      valid = 'success';
    }
  }

  return (
    <FormGroup
      controlId={name}
      validationState={valid}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        {...input}
        name={name}
        type={type}
        placeholder={label}
      />
      {touched && error && <HelpBlock>{error}</HelpBlock> }
    </FormGroup>
  );
};

inputField.propTypes = {
  input: React.PropTypes.object,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};

export const passwordField = ({ input, name, label, type,
  meta: { dirty, touched, visited, error } }) => {
  let state = null;
  let message = null;
  if (touched && error) {
    state = error.state;
    message = error.message;
  } else if (dirty && visited && error) {
    state = error.state;
    message = error.message;
  } else if (dirty && visited) {
    state = 'success';
    message = 'Password good';
  }

  return (
    <FormGroup
      controlId={name}
      validationState={state}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        {...input}
        name={name}
        type={type}
        placeholder={label}
      />
    {visited && message && <HelpBlock>{message}</HelpBlock> }
    </FormGroup>
  );
};

passwordField.propTypes = {
  input: React.PropTypes.object,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};

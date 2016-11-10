import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';
import Select from 'react-select';

export const inputField = ({ input, name, label, type,
  meta: { touched, error, dirty } }) => {
  let state = null;
  let message = null;
  if (touched && error) {
    state = error.state;
    message = error.message;
  } else if (dirty && touched) {
    state = 'success';
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
    {message && <HelpBlock>{message}</HelpBlock> }
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

export const selectField = (props) => {
  const { input, label, meta, options } = props;
  let state = null;
  let message = null;
  if (meta.touched && meta.error) {
    state = meta.error.state;
    message = meta.error.message;
  } else if (meta.dirty && meta.touched) {
    state = 'success';
  }

  return (
    <FormGroup
      controlId={input.name}
      validationState={state}
    >
      <ControlLabel>{label}</ControlLabel>
      <Select
        {...input}
        name={name}
        options={options}
        onBlur={() => (input.onBlur(input.value))}
      />
      {message && <HelpBlock>{message}</HelpBlock> }
    </FormGroup>
  );
};

selectField.propTypes = {
  input: React.PropTypes.object,
  meta: React.PropTypes.object,
  label: React.PropTypes.string,
  options: React.PropTypes.array,
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

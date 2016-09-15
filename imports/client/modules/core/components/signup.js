import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
} from 'react-bootstrap';
import zxcvbn from 'zxcvbn';

export const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = {
      message: 'Required',
      state: 'error',
    };
  } else {
    switch (zxcvbn(values.password).score) {
      case 0:
        errors.password = {
          message: 'Password too weak',
          state: 'error',
        };
        break;
      case 1:
        errors.password = {
          message: 'Password very weak',
          state: 'error',
        };
        break;
      case 2:
        errors.password = {
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

const inputField = ({ input, name, label, type, meta: { touched, error } }) => {
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

const passwordField = ({ input, name, label, type, meta: { dirty, touched, visited, error } }) => {
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
    message = 'Password safe';
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

const Signup = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props;
  return (
    <Col xs={ 12 } sm={ 8 } md={ 6 } lg={ 6 }>
      <h4 className='page-header'>Sign Up</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
            <Field name='firstName' type='text' component={inputField} label='First Name'/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
            <Field name='lastName' type='text' component={inputField} label='Last Name'/>
          </Col>
        </Row>
        <Field name='email' type='email' component={inputField} label='Email Address'/>
        <Field name='password' type='password' component={passwordField} label='Password'/>
        <div>
          <Button type='submit' disabled={pristine || submitting || invalid}>Submit</Button>
          <span className='pull-right'>
            Already have an account? <Link to='/login'>Forgot Password?</Link>
          </span>
        </div>
      </Form>
    </Col>
  );
};

Signup.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default Signup;

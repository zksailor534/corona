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
    errors.password = 'Required';
  }
  return errors;
};

const renderField = ({ input, name, label, type, meta: { touched, error } }) => {
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

renderField.propTypes = {
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
            <Field name='firstName' type='text' component={renderField} label='First Name'/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
            <Field name='lastName' type='text' component={renderField} label='Last Name'/>
          </Col>
        </Row>
        <Field name='email' type='email' component={renderField} label='Email Address'/>
        <Field name='password' type='password' component={renderField} label='Password'/>
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

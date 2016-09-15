import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { Form, Col, Button } from 'react-bootstrap';
import { inputField } from './form-fields';

export const validate = values => {
  const errors = {};
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

const Login = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props;
  return (
    <Col xs={ 12 } sm={ 8 } md={ 6 } lg={ 6 }>
      <h4 className='page-header'>Login</h4>
      <Form onSubmit={handleSubmit}>
        <Field name='email' type='email' component={inputField} label='Email Address'/>
        <Field name='password' type='password' component={inputField} label='Password'/>
        <div>
          <Button type='submit' disabled={pristine || submitting || invalid}>Submit</Button>
          <Link className='pull-right' to='/recover-password'>Forgot Password?</Link>
        </div>
      </Form>
    </Col>
  );
};

Login.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default Login;

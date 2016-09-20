import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { inputField, passwordField } from './form-fields';

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
        <Field name='email' type='text' component={inputField} label='Email Address'/>
        <Field name='passwordCreate' type='password' component={passwordField} label='Password'/>
        <div>
          <Button type='submit' disabled={pristine || submitting || invalid}>Submit</Button>
          <span className='pull-right'>
            Already have an account? <Link to='/login'>Login</Link>
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

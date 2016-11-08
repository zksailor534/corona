import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { Form, Col, Button } from 'react-bootstrap';
import { inputField } from './form-fields';

const Login = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props;
  return (
    <Col
      xs={ 12 }
      sm={ 8 } smOffset={ 2 }
      md={ 6 } mdOffset={ 3 }
      lg={ 6 } lgOffset={ 3 }
    >
      <h4 className='page-header'>Login</h4>
      <Form onSubmit={handleSubmit}>
        <Field name='email' type='text' component={inputField} label='Email Address'/>
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

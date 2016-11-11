import React from 'react';
import { Form, Col, Alert, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import { inputField } from '../form-fields';

const RecoverPassword = (props) => {
  const { handleSubmit, pristine, submitting, invalid } = props;
  return (
    <Col
      xs={ 12 }
      sm={ 8 } smOffset={ 2 }
      md={ 6 } mdOffset={ 3 }
      lg={ 6 } lgOffset={ 3 }
    >
      <h4 className='page-header'>Recover Password</h4>
      <Alert bsStyle='info'>
        Enter your email address below to receive a link to reset your password.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Field name='email' type='text' component={inputField} label='Email Address'/>
        <Button
          type='submit'
          id='recoverButton'
          bsStyle={invalid ? 'default' : 'primary'}
          disabled={pristine || submitting || invalid}
        >
          Submit
        </Button>
      </Form>
    </Col>
  );
};

RecoverPassword.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default RecoverPassword;

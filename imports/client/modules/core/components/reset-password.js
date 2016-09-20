import React from 'react';
import { Field } from 'redux-form';
import { Form, Col, Alert, Button } from 'react-bootstrap';
import { inputField, passwordField } from './form-fields';

const ResetPassword = (props) => {
  const { resetPassword, handleSubmit, pristine, submitting, invalid, params } = props;

  const onSubmit = data => {
    const d = {
      password: data.passwordCreate,
      token: params.token,
    };
    resetPassword(d);
  };

  return (
      <Col xs={ 12 } sm={ 8 } md={ 6 } lg={ 6 }>
        <h4 className="page-header">Reset Password</h4>
        <Alert bsStyle="info">
          To reset your password, enter a new one below. You will be logged in
with your new password.
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field
            name='token'
            component='input'
            type='text'
            value={params.token}
            style={{ display: 'none' }}
          />
          <Field
            name='passwordCreate'
            type='password'
            component={passwordField}
            label='Password'
          />
          <Field
            name='passwordConfirm'
            type='password'
            component={inputField}
            label='Confirm Password'
          />
          <Button type='submit' disabled={pristine || submitting || invalid}>
            Reset Password &amp; Login
          </Button>
        </Form>
      </Col>
  );
};

ResetPassword.propTypes = {
  resetPassword: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  params: React.PropTypes.object,
};

export default ResetPassword;

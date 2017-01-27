import React from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import { Field } from 'redux-form';
import { textField, passwordField } from '../form-fields';

const AcceptInvitation = ({ invitation, handleSubmit, pristine, submitting, invalid }) => (
  <Row>
    {invitation !== undefined ?
    <Col
      xs={ 12 }
      sm={ 8 } smOffset={ 2 }
      md={ 6 } mdOffset={ 3 }
      lg={ 6 } lgOffset={ 3 }
    >
      <h4 className='page-header'>Accept Invitation</h4>
      <Form onSubmit={handleSubmit}>
        <Field
          name='token'
          component='input'
          type='text'
          value={invitation.token}
          style={{ display: 'none' }}
        />
        <Field
          name='role'
          component='input'
          type='text'
          value={invitation.role}
          style={{ display: 'none' }}
        />
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
            <Field name='firstName' type='text' component={textField} label='First Name'/>
          </Col>
          <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
            <Field name='lastName' type='text' component={textField} label='Last Name'/>
          </Col>
        </Row>
        <Field
          name='email'
          type='text'
          component={textField}
          label='Email Address'
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
          component={textField}
          label='Confirm Password'
        />
        <Button
          type='submit'
          disabled={pristine || submitting || invalid}
          bsStyle={(pristine || submitting || invalid) ? 'default' : 'primary'}
        >
          Create Account
        </Button>
      </Form>
    </Col> :
    <Col xs={12}>
      <Alert bsStyle='warning'>Sorry, doesn't look like this invite is valid.</Alert>
    </Col>}
  </Row>
);

AcceptInvitation.propTypes = {
  invitation: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default AcceptInvitation;

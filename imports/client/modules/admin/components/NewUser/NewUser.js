import React from 'react';
import { Field } from 'redux-form';
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { inputField, selectField, passwordField } from '../form-fields';

const NewInvitation = (props) => {
  const { show, close, signup, handleSubmit, pristine, submitting, invalid } = props;

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
  ];

  const onSubmit = data => {
    const d = Object.assign({}, data, {
      role: data.role.value,
    });
    signup(d);
    close();
  };

  return (
    <Modal show={show}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
              <Field name='firstName' type='text' component={inputField} label='First Name'/>
            </Col>
            <Col xs={ 12 } sm={ 6 } md={ 6 } lg={ 6 }>
              <Field name='lastName' type='text' component={inputField} label='Last Name'/>
            </Col>
          </Row>
          <Field name='email' type='text' component={inputField} label='Email Address' />
          <Field name='role' component={selectField} label='User Role' options={roleOptions} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle={pristine || submitting || invalid ? 'default' : 'primary'}
            type='submit'
            disabled={pristine || submitting || invalid}
          >
            Add User
          </Button>
          <Button onClick={close}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

NewInvitation.propTypes = {
  show: React.PropTypes.bool,
  close: React.PropTypes.func,
  signup: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default NewInvitation;

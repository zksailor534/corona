import React from 'react';
import { Field } from 'redux-form';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { inputField, selectField } from '../form-fields';

import './NewInvitation.css';

const NewInvitation = ({ show, close }) => {
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
  ];
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Send Invitation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Field name='email' type='text' component={inputField} label='Email Address' />
          <Field name='role' component={selectField} label='User Role' options={roleOptions} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle='primary'>Send Invitation</Button>
        <Button onClick={close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

NewInvitation.propTypes = {
  show: React.PropTypes.bool,
  close: React.PropTypes.func,
};

export default NewInvitation;

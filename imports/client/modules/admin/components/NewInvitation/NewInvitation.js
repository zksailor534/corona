import React from 'react';
import { Field } from 'redux-form';
import {
  Modal,
  Form,
  Button,
} from 'react-bootstrap';
import { textField, selectField } from '../form-fields';

const NewInvitation = (props) => {
  const { show, close, handleSubmit, pristine, submitting, invalid } = props;
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
  ];
  return (
    <Modal show={show}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Send Invitation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Field name='email' type='text' component={textField} label='Email Address' />
          <Field
            name='roles'
            component={selectField}
            label='User Roles'
            options={roleOptions}
            multi
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle={pristine || submitting || invalid ? 'default' : 'primary'}
            type='submit'
            disabled={pristine || submitting || invalid}
          >
            Send Invitation
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
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
};

export default NewInvitation;

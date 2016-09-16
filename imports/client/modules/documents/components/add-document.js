import React from 'react';
import { Field } from 'redux-form';
import { Form } from 'react-bootstrap';
import { titleField } from './form-fields';

const AddDocument = (props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name='title'
        type='text'
        component={titleField}
        placeholder='Type a document title and press enter...'
      />
    </Form>
  );
};

AddDocument.propTypes = {
  handleSubmit: React.PropTypes.func,
};

export default AddDocument;

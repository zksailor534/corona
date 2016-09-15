import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import {
  Form,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
} from 'react-bootstrap';

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

const renderField = ({ input, name, label, type, meta: { touched, error } }) => {
  let valid = null;
  if (touched) {
    if (error) {
      valid = 'error';
    } else {
      valid = 'success';
    }
  }

  return (
    <FormGroup
      controlId={name}
      validationState={valid}
    >
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        {...input}
        name={name}
        type={type}
        placeholder={label}
      />
    {touched && error && <HelpBlock>{error}</HelpBlock> }
    </FormGroup>
  );
};

renderField.propTypes = {
  input: React.PropTypes.object,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};

const Login = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <Col xs={ 12 } sm={ 8 } md={ 6 }>
      <h4 className="page-header">Login</h4>
      <Form onSubmit={handleSubmit}>
        <Field name='email' type='email' component={renderField} label='Email Address'/>
        <Field name='password' type='password' component={renderField} label='Password'/>
        <div>
          <Button type="submit" disabled={pristine || submitting}>Submit</Button>
          <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
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
};

export default Login;

import React from 'react';
import { Link } from 'react-router';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import zxcvbn from 'zxcvbn';

const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else {
    const pr = zxcvbn(values.password);
    if (pr.score < 2) errors.password = 'Password too weak';
  }
  return errors;
};

const renderField = ({ name, label, type, placeholder, meta: { touched, error } }) => (
  <FormGroup
    controlId={name}
    validationState={touched && error ? 'error' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      type={type}
      name={name}
      placeholder={placeholder}
    />
    {touched && error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);

renderField.propTypes = {
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  meta: React.PropTypes.object,
};

const Signup = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Row>
      <Col xs={ 12 } sm={ 8 } md={ 6 }>
        <h4 className="page-header">Sign Up</h4>
        <form className="signup" onSubmit={ handleSubmit }>
          <Row>
            <Col xs={ 6 } sm={ 6 }>
              <Field
                name="firstName"
                label="First Name"
                type="text"
                placeholder="First Name"
                component={ renderField }/>
            </Col>
            <Col xs={ 6 } sm={ 6 }>
              <Field
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Last Name"
                component={ renderField }/>
            </Col>
          </Row>
          <Field
            name="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            component={ renderField }/>
          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            component={ renderField }/>
          <Button
            type="submit"
            bsStyle="success"
            disabled={pristine || submitting}
            onClick={reset}>
            Sign Up
          </Button>
          <span style={{ float: 'right' }}>
            Already have an account? <Link to="/login">Log In</Link>.
          </span>
        </form>
      </Col>
    </Row>
  );
};

Signup.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
};

export default reduxForm({
  form: 'signup',
  validate,
})(Signup);

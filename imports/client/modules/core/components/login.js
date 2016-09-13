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
import validate from 'validate.js';

const constraints = {
  email: {
    email: true,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
      emailValidationState: null,
      passwordValidationState: null,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password.length) {
      this.props.submitLogin({
        email: this.state.email,
        password: this.state.password,
        component: this,
      });
    } else {
      this.setState({
        validPassword: false,
        passwordValidationState: null,
        passwordMessage: 'Please enter password',
      });
    }
  }

  setValue(event) {
    event.preventDefault();
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  validateEmail(event) {
    event.preventDefault();
    if (!event.target.value.length) {
      this.setState({
        validEmail: false,
        emailValidationState: null,
        emailMessage: 'Please enter valid email',
      });
    } else {
      const res = validate({ email: event.target.value }, constraints);
      if (res !== undefined) {
        this.setState({
          validEmail: false,
          emailValidationState: 'error',
          emailMessage: res.email[0],
        });
      } else {
        this.setState({
          validEmail: true,
          emailValidationState: 'success',
          emailMessage: null,
        });
      }
    }
  }

  render() {
    const {
      email,
      emailMessage,
      emailValidationState,
      password,
      passwordMessage,
      passwordValidationState,
    } = this.state;
    const buttonState = !this.state.validEmail;
    return (
      <Row>
        <Col xs={ 12 } sm={ 6 } md={ 4 }>
          <h4 className="page-header">Login</h4>
          <form ref="login" className="login" onSubmit={ this.handleSubmit.bind(this) }>
            <FormGroup
              controlId="emailAddress"
              validationState={emailValidationState}
            >
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onBlur={this.validateEmail.bind(this)}
                onChange={this.setValue.bind(this)}
              />
              {emailMessage ? <HelpBlock>{emailMessage}</HelpBlock> : null }
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={passwordValidationState}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.setValue.bind(this)}
              />
              {passwordMessage ? <HelpBlock>{passwordMessage}</HelpBlock> : null }
            </FormGroup>
            <Button
              type="submit"
              bsStyle="success"
              disabled={buttonState}
            >
              Login
            </Button>
            <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
          </form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  submitLogin: React.PropTypes.func.isRequired,
};

export default Login;

import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
// import validate from 'validate.js';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      repeatPassword: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.password === this.state.repeatPassword) {
      this.props.resetPassword({
        token: this.props.params.token,
        password: this.state.password,
      });
    }
  }

  setValue(event) {
    event.preventDefault();
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 } sm={ 6 } md={ 4 }>
          <h4 className="page-header">Reset Password</h4>
          <Alert bsStyle="info">
            To reset your password, enter a new one below. You will be logged in
  with your new password.
          </Alert>
          <form
            ref="resetPassword"
            className="reset-password"
            onSubmit={ this.handleSubmit.bind(this) }
          >
            <FormGroup>
              <ControlLabel>New Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.setValue.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Repeat New Password</ControlLabel>
              <FormControl
                type="password"
                name="repeatPassword"
                placeholder="Repeat New Password"
                value={this.state.repeatPassword}
                onChange={this.setValue.bind(this)}
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Reset Password &amp; Login</Button>
          </form>
        </Col>
      </Row>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
  resetPassword: React.PropTypes.func.isRequired,
};

export default ResetPassword;

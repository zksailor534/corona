import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
// import validate from 'validate.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitLogin({
      email: this.state.email,
      password: this.state.password,
      component: this,
    });
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
          <h4 className="page-header">Login</h4>
          <form ref="login" className="login" onSubmit={ this.handleSubmit.bind(this) }>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.setValue.bind(this)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.setValue.bind(this)}
              />
              <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
            </FormGroup>
            <Button type="submit" bsStyle="success">Login</Button>
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

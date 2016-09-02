import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleLogin from '../libs/login';

class Login extends React.Component {
  // componentDidMount() {
  //   handleLogin({ component: this });
  // }

  handleSubmit(event) {
    event.preventDefault();
    handleLogin({ component: this });
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
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
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

export default Login;

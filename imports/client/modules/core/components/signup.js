import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
// import validate from 'validate.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitSignup({
      email: this.state.email,
      password: this.state.password,
      profile: {
        name: {
          first: this.state.firstName,
          last: this.state.lastName,
        },
      },
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
          <h4 className="page-header">Sign Up</h4>
          <form ref="signup" className="signup" onSubmit={ this.handleSubmit.bind(this) }>
            <Row>
              <Col xs={ 6 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.setValue.bind(this)}
                  />
                </FormGroup>
              </Col>
              <Col xs={ 6 } sm={ 6 }>
                <FormGroup>
                  <ControlLabel>Last Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.setValue.bind(this)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="text"
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
            </FormGroup>
            <Button type="submit" bsStyle="success">Sign Up</Button>
          </form>
          <p>Already have an account? <Link to="/login">Log In</Link>.</p>
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  submitSignup: React.PropTypes.func.isRequired,
};

export default Signup;

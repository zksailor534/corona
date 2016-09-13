import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
// import validate from 'validate.js';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.recoverPassword({ email: this.state.email });
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
          <h4 className="page-header">Recover Password</h4>
          <Alert bsStyle="info">
            Enter your email address below to receive a link to reset your password.
          </Alert>
          <form
            ref="recoverPassword"
            className="recover-password"
            onSubmit={ this.handleSubmit.bind(this) }
          >
            <FormGroup>
              <FormControl
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.setValue.bind(this)}
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Recover Password</Button>
          </form>
        </Col>
      </Row>
    );
  }
}

RecoverPassword.propTypes = {
  recoverPassword: React.PropTypes.func.isRequired,
};

export default RecoverPassword;

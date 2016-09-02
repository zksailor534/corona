import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '../libs/recover-password';

export class RecoverPassword extends React.Component {
  // componentDidMount() {
  //   handleRecoverPassword({ component: this });
  // }

  handleSubmit(event) {
    event.preventDefault();
    handleRecoverPassword({ component: this });
  }

  render() {
    return (
      <Row>
        <Col xs={ 12 } sm={ 6 } md={ 4 }>
          <h4 className="page-header">Recover Password</h4>
          <Alert bsStyle="info">
            Enter your email address below to receive a link to reset your password.
          </Alert>
          <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit.bind(this) }>
            <FormGroup>
              <FormControl
                type="email"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Recover Password</Button>
          </form>
        </Col>
      </Row>
    );
  }
}

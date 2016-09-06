import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';

class Document extends React.Component {
  handleUpdateDocument(documentId, event) {
    const title = event.target.value.trim();
    if (title !== '' && event.keyCode === 13) {
      this.props.update({
        _id: documentId,
        title,
      });
    }
  }

  handleRemoveDocument(documentId, event) {
    event.preventDefault();
    // this should be replaced with a styled solution so for now we will
    // disable the eslint `no-alert`
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure? This is permanent.')) {
      this.props.remove({
        _id: documentId,
      });
    }
  }

  render() {
    return (
      <ListGroupItem key={ this.props.document._id }>
        <Row>
          <Col xs={ 8 } sm={ 10 }>
            <FormControl
              type="text"
              defaultValue={ this.props.document.title }
              onKeyUp={ this.handleUpdateDocument.bind(this, this.props.document._id) }
            />
          </Col>
          <Col xs={ 4 } sm={ 2 }>
            <Button
              bsStyle="danger"
              className="btn-block"
              onClick={ this.handleRemoveDocument.bind(this, this.props.document._id) }>
              Remove
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
}

Document.propTypes = {
  document: React.PropTypes.object.isRequired,
  update: React.PropTypes.func.isRequired,
  remove: React.PropTypes.func.isRequired,
};

export default Document;

import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import Document from '../containers/document';

class DocumentsList extends React.Component {
  render() {
    return (
      this.props.documents.length > 0 ? <ListGroup className="documents-list">
        {this.props.documents.map((doc) => (
          <Document key={ doc._id } document={ doc } />
        ))}
      </ListGroup> :
      <Alert bsStyle="warning">No documents yet.</Alert>
    );
  }
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array,
};

export default DocumentsList;

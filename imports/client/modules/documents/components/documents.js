import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AddDocument from '../containers/add-document';
import DocumentsList from '../containers/documents-list';

class Documents extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={ 12 }>
          <h4 className="page-header">Documents</h4>
          <AddDocument />
          <DocumentsList />
        </Col>
      </Row>
    );
  }
}

export default Documents;

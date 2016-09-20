import React from 'react';
import { Col } from 'react-bootstrap';
import AddDocument from '../containers/add-document';
import DocumentsList from '../containers/documents-list';

const Documents = () => (
  <Col>
    <h4 className="page-header">Documents</h4>
    <AddDocument />
    <DocumentsList />
  </Col>
);

export default Documents;

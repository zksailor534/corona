import React from 'react';
import AddDocument from '../../containers/AddDocument';
import DocumentsList from '../../containers/DocumentsList';

const DocumentsPage = () => (
  <div className="container">
    <h4 className="page-header">Documents</h4>
    <AddDocument />
    <DocumentsList />
  </div>
);

export default DocumentsPage;

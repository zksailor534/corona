import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

class AddDocument extends React.Component {
  handleInsertDocument(event) {
    const target = event.target;
    const title = target.value.trim();
    const { insert } = this.props;

    if (title !== '' && event.keyCode === 13) {
      insert({
        title,
      });
    }
  }

  render() {
    return (
      <FormGroup>
        <FormControl
          type="text"
          onKeyUp={ this.handleInsertDocument.bind(this) }
          placeholder="Type a document title and press enter..."
        />
      </FormGroup>
    );
  }
}

AddDocument.propTypes = {
  insert: React.PropTypes.func.isRequired,
};

export default AddDocument;

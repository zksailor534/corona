import { Bert } from 'meteor/themeteorchef:bert';
import { reset } from 'redux-form';

export default {
  // ! ------------------------------------------
  // Insert Document
  // ! ------------------------------------------
  insert({ Meteor, Store }, { title }) {
    const id = Meteor.uuid();

    Meteor.call(
      'documents.insert',
      {
        _id: id,
        title,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Store.dispatch(reset('documents-add'));
          Bert.alert('Document added!', 'success');
        }
      }
    );
  },

  // ! ------------------------------------------
  // Update Document
  // ! ------------------------------------------
  update({ Meteor }, { _id, title }) {
    Meteor.call(
      'documents.update',
      {
        _id,
        update: { title },
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Document updated!', 'success');
        }
      }
    );
  },

  // ! ------------------------------------------
  // Remove Document
  // ! ------------------------------------------
  remove({ Meteor }, { _id }) {
    Meteor.call(
      'documents.remove',
      {
        _id,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Document removed!', 'success');
        }
      }
    );
  },
};

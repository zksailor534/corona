import { Bert } from 'meteor/themeteorchef:bert';

export default {
  insert({ Meteor }, { title }) {
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
          // target.value = ''; UPDATE REDUX STATE
          Bert.alert('Document added!', 'success');
        }
      }
    );
  },
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

// ! ------------------------------------------
// Redux action creators
// ! ------------------------------------------
const roleChangeRequest = (id) => ({
  type: 'ROLE_CHANGE_REQUEST',
  id,
});

const roleChangeError = (id) => ({
  type: 'ROLE_CHANGE_ERROR',
  id,
});

const roleChangeSuccess = (id) => ({
  type: 'ROLE_CHANGE_SUCCESS',
  id,
});

export default {
// ! ------------------------------------------
// Change User Role
// ! ------------------------------------------
  changeRole({ Meteor, Store, Bert }, id, role) {
    const { dispatch } = Store;

    // Change state to role change request
    dispatch(roleChangeRequest(id));

    // Call role change method
    Meteor.call(
      'role.set',
      {
        id,
        role,
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
          // Change state to role change error
          dispatch(roleChangeError(id));
        } else {
          Bert.alert('Role changed!', 'success');
          // Change state to successful login
          dispatch(roleChangeSuccess(id));
        }
      }
    );
  },
};

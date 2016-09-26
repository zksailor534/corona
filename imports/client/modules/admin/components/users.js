import React from 'react';
import { Form, Alert } from 'react-bootstrap';
import User from './user';

const Users = (props) => {
  const { handleSubmit, users } = props;

  const listUsers = () => (
    users.map((u) => (<User key={u._id} user={u} />))
  );

  return (
    <div>
      <h4 className='page-header'>Users</h4>
      <Form onSubmit={handleSubmit}>
        {users.length > 0 ?
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Email Address</th>
                <th className='text-center'>Role</th>
              </tr>
            </thead>
            <tbody>
              {listUsers()}
            </tbody>
          </table> :
          <Alert bsStyle='warning'>No users found.</Alert>}
      </Form>
    </div>
  );
};

Users.propTypes = {
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  invalid: React.PropTypes.bool,
  users: React.PropTypes.object,
  initialValues: React.PropTypes.object,
};

export default Users;

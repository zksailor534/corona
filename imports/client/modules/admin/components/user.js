import React from 'react';
import { Field } from 'redux-form';

const User = ({ user }) => {
  const id = user._id;
  const email = user.emails[0].address;
  const firstName = user.profile.name.first;
  const lastName = user.profile.name.last;

  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>
        <Field name={id} component='select' className='form-control'>
          <option value='admin'>Admin</option>
          <option value='manager'>Manager</option>
          <option value='user'>User</option>
        </Field>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: React.PropTypes.object,
};

export default User;

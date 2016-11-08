/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from 'faker';

import User from './User';

const testUser = {
  _id: faker.random.uuid(),
  emails: [
    { address: faker.internet.email() },
  ],
  password: faker.internet.password(),
  profile: {
    name: {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
    },
  },
  roles: ['user'],
};

describe('<User />', () => {
  it('should have props for user, role, changeRole, currentUser, & removeUser',
    function () {
      const wrapper = shallow(<User user={testUser} />);
      expect(wrapper.props().user).to.be.defined;
      expect(wrapper.props().role).to.be.defined;
      expect(wrapper.props().changeRole).to.be.defined;
      expect(wrapper.props().currentUser).to.be.defined;
      expect(wrapper.props().removeUser).to.be.defined;
    }
  );

  it('should have a button to remove user', function () {
    const wrapper = shallow(<User user={testUser} />);
    expect(wrapper.find('Button')).to.have.length(1);
  });

  it('should have a dropdown to select a role', function () {
    const wrapper = shallow(<User user={testUser} />);
    expect(wrapper.find('select')).to.have.length(1);
    expect(wrapper.find('select').prop('name')).to.contain(testUser._id);
  });

  it('should hide button when current user', function () {
    const wrapper = shallow(<User user={testUser} currentUser={true}/>);
    expect(wrapper.find('Button').prop('style').display).to.equal('none');
  });

  it('should call changeRole when select is changed', function () {
    const changeRole = sinon.spy();
    const wrapper = mount(
      <table>
        <tbody>
          <User user={testUser} changeRole={changeRole} />
        </tbody>
      </table>
    );
    wrapper.find('select').simulate('change');
    expect(changeRole.calledOnce).to.equal(true);
  });
});

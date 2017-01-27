/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from 'faker';

import Invite from './Invite';

const testInvite = {
  email: faker.internet.email(),
  token: faker.random.uuid(),
  role: faker.name.jobDescriptor(),
  date: faker.date.recent().toString(),
};

describe('<Invite />', () => {
  it('should have props for email, token, role, date, & removeInvite',
    function () {
      const wrapper = shallow(<Invite />);
      expect(wrapper.props().email).to.be.defined;
      expect(wrapper.props().token).to.be.defined;
      expect(wrapper.props().role).to.be.defined;
      expect(wrapper.props().date).to.be.defined;
      expect(wrapper.props().removeInvite).to.be.defined;
    },
  );

  it('should have a button to remove invite', function () {
    const wrapper = shallow(<Invite />);
    expect(wrapper.find('Button')).to.have.length(1);
  });

  it('should display given invite', function () {
    const wrapper = shallow(
      <Invite
        email={testInvite.email}
        token={testInvite.token}
        role={testInvite.role}
        date={testInvite.date}
      />,
    );
    expect(wrapper.find(`#email-${testInvite.token}`).text()).to.equal(testInvite.email);
    expect(wrapper.find(`#role-${testInvite.token}`).text()).to.equal(testInvite.role);
    expect(wrapper.find(`#date-${testInvite.token}`).text()).to.equal(testInvite.date);
  });

  it('should call removeInvite when button is clicked', function () {
    const removeInvite = sinon.spy();
    const wrapper = mount(
      <table>
        <tbody>
          <Invite
            email={testInvite.email}
            token={testInvite.token}
            role={testInvite.role}
            date={testInvite.date}
            removeInvite={removeInvite}
          />
        </tbody>
      </table>,
    );
    wrapper.find('Button').simulate('click');
    expect(removeInvite.calledOnce).to.equal(true);
  });
});

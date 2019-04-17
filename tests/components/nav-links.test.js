import React from 'react';
import { shallow } from 'enzyme';
import NavLinks from 'components/NavLinks';

describe('Nav Links', () => {
  const navigationList = [
    {
      id: 'profile',
      label: 'My Profile'
    },
    {
      id: 'billing',
      label: 'Membership & Billing'
    },
    {
      id: 'page3',
      label: 'Page Name'
    },
    {
      id: 'page4',
      label: 'Page Name'
    },
    {
      id: 'page5',
      label: 'Page Name'
    }
  ];

  describe('Render', () => {
    const nav = shallow(<NavLinks routes={navigationList} active="profile" />);
    it('correctly sets the active link', () => {
      expect(nav.find('[data-active=true]').text()).toEqual('My Profile');
    });

    nav.find('li').forEach((item, index) => {
      it('item labels are correct', () => {
        expect(item.text()).toEqual(navigationList[index].label);
      });
    });

    navigationList.forEach(item => {
      it('all links in navigationList exist', () => {
        expect(nav.find(`[href="${item.id}"]`).exists()).toEqual(true);
      });
    });
  });
});

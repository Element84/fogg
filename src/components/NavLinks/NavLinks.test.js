import React from 'react';
import { shallow } from 'enzyme';

import NavLinks from './';
import WonderLink from '../WonderLink';

describe('Nav Links', () => {
  const navigationList = [
    {
      id: 'profile',
      to: '/profile',
      label: 'My Profile'
    },
    {
      id: 'billing',
      to: '/billing',
      label: 'Membership & Billing'
    },
    {
      id: 'page3',
      to: 'page3',
      label: 'Page Name'
    },
    {
      id: 'page4',
      to: 'page4',
      label: 'Page Name'
    },
    {
      id: 'page5',
      to: 'page5',
      label: 'Page Name'
    }
  ];

  describe('Render', () => {
    const nav = shallow(<NavLinks routes={navigationList} active="profile" />);
    it('correctly sets the active link', () => {
      expect(
        nav
          .find('[data-active=true]')
          .find(WonderLink)
          .props().to
      ).toEqual('/profile');
    });

    nav.find('li a').forEach((item, index) => {
      it('item labels are correct', () => {
        expect(item.text()).toEqual(navigationList[index].label);
      });
    });

    navigationList.forEach(item => {
      it('all links in navigationList exist', () => {
        expect(
          nav
            .find(WonderLink)
            .findWhere(n => n.prop('to') === item.to)
            .exists()
        ).toEqual(true);
      });
    });
  });
});

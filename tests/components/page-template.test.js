import React from 'react';
import { shallow } from 'enzyme';
import PageTemplate from 'components/PageTemplate';
import { FaUser } from 'react-icons/fa';

describe('Page Template', () => {
  const navigation = [
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

  const parent = {
    id: 'account',
    to: '/account',
    label: 'My Account'
  };

  describe('Render', () => {
    const page = shallow(
      <PageTemplate
        id="profile"
        parent={parent}
        title="My Profile"
        navigation={navigation}
        icon={<FaUser />}
      />
    );

    it('correctly renders the page title', () => {
      expect(page.find('.page-header h1 span').text()).toEqual('My Profile');
    });

    it('correctly renders the passed in icon', () => {
      expect(page.find('.page-header h1').text()).toMatch(/<FaUser/);
    });

    it('correctly displays parent link', () => {
      expect(page.find('.page-parent-link').text()).toMatch(/My Account/);
    });

    it('does not display parent link when no parent is provided', () => {
      const noparent = shallow(
        <PageTemplate
          id="profile"
          title="My Profile"
          navigation={navigation}
          icon={<FaUser />}
        />
      );
      expect(noparent.find('.page-parent-link').exists()).toEqual(false);
    });
  });
});

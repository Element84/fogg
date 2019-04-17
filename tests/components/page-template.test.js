import React from 'react';
import { shallow } from 'enzyme';
import PageTemplate from 'components/PageTemplate';

describe('Page Template', () => {
  const navigation = [
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

  const parent = {
    id: 'account',
    label: 'My Account'
  };

  describe('Render', () => {
    const page = shallow(
      <PageTemplate
        id="profile"
        parent={parent}
        title="My Profile"
        navigation={navigation}
        icon="FaUser"
      />
    );

    it('correctly renders the page title', () => {
      expect(page.find('.header h1 span').text()).toEqual('My Profile');
    });

    it('correctly renders the passed in icon', () => {
      expect(page.find('.header h1').text()).toMatch(/<FaUser/);
    });

    it('correctly displays parent link', () => {
      expect(page.find('.parent-link').text()).toMatch(/My Account/);
    });

    it('does not display parent link when no parent is provided', () => {
      const noparent = shallow(
        <PageTemplate
          id="profile"
          title="My Profile"
          navigation={navigation}
          icon="FaUser"
        />
      );
      expect(noparent.find('.parent-link').exists()).toEqual(false);
    });
  });
});

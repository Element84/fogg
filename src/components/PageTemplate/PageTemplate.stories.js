import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaUser } from 'react-icons/fa';

import PageTemplate from './';
import FormInput from '../FormInput';
import Button from '../Button';

const stories = storiesOf('Components|Template', module);

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

stories.add('Default', () => {
  return (
    <PageTemplate
      id="profile"
      parent={parent}
      title="My Profile"
      navigation={navigation}
      icon={<FaUser />}
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed
        magna ultrices, aliquam elit quis, feugiat nibh. Curabitur efficitur
        nisl pharetra, blandit nunc sit amet, hendrerit lorem. Nullam luctus
        tempor consequat. Pellentesque a bibendum lorem, eget iaculis tortor.
        Suspendisse potenti.
      </div>

      <FormInput id="default-text" label="Default Text" />
      <FormInput id="default-email" label="Default Email" type="email" />
      <FormInput
        id="default-password"
        label="Default Password"
        type="password"
      />
      <Button to="/" text="Button" disabled={true} />
    </PageTemplate>
  );
});

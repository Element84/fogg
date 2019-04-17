import React from 'react';
import { storiesOf } from '@storybook/react';

import PageTemplate from '../../components/PageTemplate';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';

const stories = storiesOf('Components|Template', module);

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

stories.add('Default', () => {
  return (
    <PageTemplate
      id="profile"
      parent={parent}
      title="My Profile"
      navigation={navigation}
      icon="FaUser"
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

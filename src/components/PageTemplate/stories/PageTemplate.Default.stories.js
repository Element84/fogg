import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaUser } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import PageTemplate from '../';

const STORY_COMPONENT = 'Page Template';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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
    label: 'Page 3'
  },
  {
    id: 'page4',
    to: 'page4',
    label: 'Page 4'
  },
  {
    id: 'page5',
    to: 'page5',
    label: 'Page 5'
  }
];

const parent = {
  id: 'account',
  to: '/account',
  label: 'My Account'
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <PageTemplate
        id="page4"
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
      </PageTemplate>
    </Story>
  );
});

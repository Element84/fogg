import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import NavLinks from '../';

const STORY_COMPONENT = 'Nav Links';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <NavLinks routes={navigationList} active="page4" />
    </Story>
  );
});

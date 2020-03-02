import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Thumbnails';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ItemList
        items={[
          {
            thumb: 'https://www.placecage.com/200/200',
            label: 'Why',
            to: '#'
          },
          {
            thumb: 'https://www.placecage.com/300/300',
            label: 'Not',
            to: '#'
          },
          {
            thumb: 'https://www.placecage.com/400/400',
            label: 'Nic',
            to: '#'
          },
          {
            thumb: 'https://www.placecage.com/500/500',
            label: 'Cage (No Icon, No To)',
            icon: false
          },
          {
            thumb: 'https://www.placecage.com/600/600',
            label: '?  (No To)'
          }
        ]}
      />
    </Story>
  );
});

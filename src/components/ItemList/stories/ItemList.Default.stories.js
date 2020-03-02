import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Default';

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
            label: 'Kaaaaaaaaa',
            to: '#'
          },
          {
            label: 'Meeeeeeeeeeeee',
            to: '#'
          },
          {
            label: 'Haaaaaa',
            to: '#'
          },
          {
            label: 'Meeeeeeeeeee (No Icon, No To)',
            icon: false
          },
          {
            label: 'Haaaaaaaaaaaaaaaaaa (No To)'
          }
        ]}
      />
    </Story>
  );
});

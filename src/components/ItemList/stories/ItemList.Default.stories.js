import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const items = [
  {
    id: 'item-1',
    label: 'Regional'
  },
  {
    id: 'item-2',
    label: 'Branding'
  },
  {
    id: 'item-3',
    label: 'Turkey'
  },
  {
    id: 'item-4',
    label: 'Dynamic'
  },
  {
    id: 'item-5',
    label: 'Array'
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ItemList items={items} />
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Thumbnails';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const items = [
  {
    id: 'item-1',
    thumb: 'https://picsum.photos/100',
    label: 'Wooden',
    to: '#'
  },
  {
    id: 'item-2',
    thumb: 'https://picsum.photos/150',
    label: 'Practical',
    to: '#'
  },
  {
    id: 'item-3',
    thumb: 'https://picsum.photos/200',
    label: 'Keyboard',
    to: '#'
  },
  {
    id: 'item-4',
    thumb: 'https://picsum.photos/250',
    label: 'Electronics'
  },
  {
    id: 'item-5',
    thumb: 'https://picsum.photos/300',
    label: 'Gold'
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ItemList items={items} />
    </Story>
  );
});

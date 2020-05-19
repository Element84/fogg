import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Mouse Events';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const items = [
  {
    id: 'item-1',
    label: 'Mills',
    to: '#'
  },
  {
    id: 'item-2',
    label: 'bar',
    to: '#'
  },
  {
    id: 'item-3',
    label: 'open-source',
    to: '#'
  },
  {
    id: 'item-4',
    label: 'RSS'
  },
  {
    id: 'item-5',
    label: 'Tajikistan'
  }
];

stories.add(STORY_NAME, () => {
  function handleMouseEvent (name, event) {
    event.persist();
    const { currentTarget } = event;
    const label = currentTarget.querySelector('.item-list-item-label')
      .innerText;
    action(name)(
      event,
      currentTarget,
      JSON.stringify({
        label,
        id: currentTarget.id
      })
    );
  }

  function handleItemOnMouseEnter (event) {
    handleMouseEvent('item-mouseEnter', event);
  }

  function handleItemOnMouseLeave (event) {
    handleMouseEvent('item-mouseLeave', event);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ItemList
        items={items}
        onItemMouseEnter={handleItemOnMouseEnter}
        onItemMouseLeave={handleItemOnMouseLeave}
      />
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Mouse Events';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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
        items={[
          {
            id: 'item-1',
            thumb: 'https://www.placecage.com/200/200',
            label: 'Why',
            to: '#'
          },
          {
            id: 'item-2',
            thumb: 'https://www.placecage.com/300/300',
            label: 'Not',
            to: '#'
          },
          {
            id: 'item-3',
            thumb: 'https://www.placecage.com/400/400',
            label: 'Nic',
            to: '#'
          },
          {
            id: 'item-4',
            thumb: 'https://www.placecage.com/500/500',
            label: 'Cage (No Icon, No To)',
            icon: false
          },
          {
            id: 'item-5',
            thumb: 'https://www.placecage.com/600/600',
            label: '?  (No To)'
          }
        ]}
        onItemMouseEnter={handleItemOnMouseEnter}
        onItemMouseLeave={handleItemOnMouseLeave}
      />
    </Story>
  );
});

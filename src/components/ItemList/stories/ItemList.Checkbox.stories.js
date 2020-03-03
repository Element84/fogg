import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Checkbox';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  const items = [
    {
      id: 'item-1',
      thumb: 'https://www.placecage.com/200/200',
      label: 'Why',
      to: '#'
    },
    {
      id: 'item-2',
      thumb: 'https://www.placecage.com/300/300',
      label: 'Not (Checked by default)',
      to: '#',
      isChecked: true
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
  ];

  function onCheck ({ target = {} } = {}, event) {
    action(target.value)(target.checked);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ItemList items={items} onCheck={onCheck} />
    </Story>
  );
});

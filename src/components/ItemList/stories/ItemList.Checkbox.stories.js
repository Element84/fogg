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
      label: 'Deposit',
      to: '#'
    },
    {
      id: 'item-2',
      label: 'XML (Checked by default)',
      to: '#',
      isChecked: true
    },
    {
      id: 'item-3',
      label: 'B2C',
      to: '#'
    },
    {
      id: 'item-4',
      label: 'Encoding (No Icon, No To)',
      icon: false
    },
    {
      id: 'item-5',
      label: 'Initiatives  (No To)'
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

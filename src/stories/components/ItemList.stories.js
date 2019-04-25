import React from 'react';
import { storiesOf } from '@storybook/react';

import ItemList from '../../components/ItemList';

const stories = storiesOf('Components|ItemList', module);

stories.add('Default', () => {
  return (
    <>
      <ItemList
        items={[
          {
            label: 'Ka',
            to: '#'
          },
          {
            label: 'Me',
            to: '#'
          },
          {
            label: 'Ha',
            to: '#'
          },
          {
            label: 'Me',
            to: '#'
          },
          {
            label: 'Ha',
            to: '#'
          }
        ]}
      />
    </>
  );
});

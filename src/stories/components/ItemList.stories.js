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
            label: 'Meeeeeeeeeee',
            to: '#'
          },
          {
            label: 'Haaaaaaaaaaaaaaaaaa',
            to: '#'
          }
        ]}
      />
    </>
  );
});

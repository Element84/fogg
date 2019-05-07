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

stories.add('Thumbnails', () => {
  return (
    <>
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
            label: 'Cage',
            to: '#'
          },
          {
            thumb: 'https://www.placecage.com/600/600',
            label: '?',
            to: '#'
          }
        ]}
      />
    </>
  );
});

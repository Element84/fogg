import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import ItemList from '../';

import rocketMarker from '../../../assets/images/rocket.svg';

const STORY_COMPONENT = 'Item List';
const STORY_NAME = 'Nested';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

let subList = [
  {
    label: 'Boing 1',
    to: '#'
  },
  {
    label: 'Boing 2',
    to: '#'
  },
  {
    label: 'Boing 1',
    to: '#'
  },
  {
    label: 'Boing 2',
    to: '#',
    sublabels: ['Sub-Sub Label']
  },
  {
    label: 'Boing 3'
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
  }
];


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
            to: '#',
            sublabels: ['Sub Label', 'Other Sub Label']
          },
          {
            label: 'Haaaaaa',
            to: '#',
            hasChildren: true,
            children: subList
          },
          {
            label: 'Meeeeeeeeeee (No Icon, No To)',
            icon: false
          },
          {
            label: 'Haaaaaaaaaaaaaaaaaa (No To)'
          },
          {
            label: 'Sub List',
            hasChildren: true,
            children: subList
          }
        ]}
        subListIcon={rocketMarker}
      />
    </Story>
  );
});

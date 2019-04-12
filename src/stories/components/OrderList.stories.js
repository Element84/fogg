import React from 'react';
import { storiesOf } from '@storybook/react';

import OrdersList from '../../components/OrdersList';

const orderData = [
  {
    id: 1,
    name: 'Two Reams Premium Copy Paper',
    windowOpen: 1554416208102,
    windowClose: 1554696000000,
    status: 'accepted'
  },
  {
    id: 2,
    name: 'One Ream Premium Glossy Paper',
    windowOpen: 1554416208102,
    windowClose: 1554696000000,
    status: 'accepted'
  },
  {
    id: 3,
    name: ' 20 Pads Sticky Squares',
    windowOpen: 1554416208102,
    windowClose: 1554696000000,
    status: 'accepted'
  }
];

const columns = ['Order', 'Start Date', 'End Date', 'Current Status'];

const stories = storiesOf('Components|OrdersList', module);

stories.add('Default', () => {
  return <OrdersList orders={orderData} />;
});

stories.add('Custom Headers', () => {
  return <OrdersList headers={columns} orders={orderData} />;
});

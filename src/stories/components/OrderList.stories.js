import React from 'react';
import { storiesOf } from '@storybook/react';

import OrdersList from '../../components/OrdersList';

const ordersData = [
  {
    orderId: 1,
    productIdentifier: 'Two Reams Premium Copy Paper',
    orderDate: '04/04/2019',
    orderStatus: 'accepted'
  },
  {
    orderId: 2,
    productIdentifier: 'One Ream Premium Glossy Paper',
    orderDate: '04/07/2019',
    orderStatus: 'accepted'
  },
  {
    orderId: 3,
    productIdentifier: ' 20 Pads Sticky Squares',
    orderDate: '04/12/2019',
    orderStatus: 'accepted'
  }
];

const columns = ['Order', 'Order Date', 'Current Status'];

const stories = storiesOf('Components|OrdersList', module);

stories.add('Default', () => {
  return <OrdersList orders={ordersData} />;
});

stories.add('Custom Headers', () => {
  return <OrdersList headers={columns} orders={ordersData} />;
});

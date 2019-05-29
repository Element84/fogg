import React from 'react';
import { storiesOf } from '@storybook/react';

import OrderStatus from '../../components/OrderStatus';

const data = [
  {
    orderId: 123456,
    productIdentifier: 'Hylian Shield',
    orderStatus: 'delivered',
    orderDate: 1554782400000
  }
];

const headers = ['Order Date'];

const stories = storiesOf('Components|OrderStatus', module);

stories.add('Default', () => {
  return data.map((order, index) => {
    return <OrderStatus headers={headers} order={order} key={index} />;
  });
});

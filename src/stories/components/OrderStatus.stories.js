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

const stories = storiesOf('Components|OrderStatus', module);

stories.add('Default', () => {
  return data.map((order, index) => {
    return <OrderStatus order={order} key={index} />;
  });
});
stories.add('Disabled', () => {
  return data.map((order, index) => {
    return <OrderStatus order={order} disabled="false" key={index} />;
  });
});

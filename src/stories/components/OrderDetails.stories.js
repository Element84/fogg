import React from 'react';
import { storiesOf } from '@storybook/react';

import OrderDetails from '../../components/OrderDetails';

const data = [
  {
    orderId: 123456,
    productIdentifier: 'Hylian Shield',
    orderStatus: 'delivered',
    orderDate: 1554782400000
  }
];

const headers = ['Order Date'];

const stories = storiesOf('Components|OrderDetails', module);

stories.add('Default', () => {
  return data.map((order, index) => {
    return <OrderDetails headers={headers} order={order} key={index} />;
  });
});
stories.add('Disabled', () => {
  return data.map((order, index) => {
    return (
      <OrderDetails
        headers={headers}
        order={order}
        disabled="false"
        key={index}
      />
    );
  });
});

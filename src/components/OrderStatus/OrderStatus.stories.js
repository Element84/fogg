import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OrderStatus from './';

const data = [
  {
    id: 123456,
    status: 'completed',
    orderDate: 1554782400000
  }
];

function handleClick (e) {
  action('OrderStatus::onClick')(e);
}

const stories = storiesOf('Components|OrderStatus', module);

stories.add('Default', () => {
  return data.map((order, index) => {
    return <OrderStatus order={order} key={index} onClick={handleClick} />;
  });
});
stories.add('Disabled', () => {
  return data.map((order, index) => {
    return <OrderStatus order={order} disabled="false" key={index} />;
  });
});

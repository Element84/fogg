import React from 'react';
import { storiesOf } from '@storybook/react';

import OrdersList from '../../components/OrdersList';

const ordersData = [
  {
    orderId: '1234-325245',
    orderDate: '04/04/2019',
    orderStatus: 'accepted'
  },
  {
    orderId: '2346256-342632',
    orderDate: '04/07/2019',
    orderStatus: 'accepted'
  },
  {
    orderId: '3345324-45274',
    orderDate: '04/12/2019',
    orderStatus: 'accepted'
  }
];

const dataEmpty = [
  {
    orderId: undefined,
    orderDate: undefined,
    orderStatus: undefined
  },
  {
    orderId: undefined,
    orderDate: undefined,
    orderStatus: undefined
  }
];

const columns = ['Order', 'Date Ordered', 'Current Status', 'Test'];

const stories = storiesOf('Components|OrdersList', module);

stories.add('Default', () => {
  return <OrdersList orders={ordersData} />;
});

stories.add('Custom Headers', () => {
  return <OrdersList headers={columns} orders={ordersData} />;
});

stories.add('Filler', () => {
  return <OrdersList headers={columns} orders={dataEmpty} />;
});

stories.add('Empty', () => {
  return (
    <>
      <OrdersList tasks={[]} />
      <OrdersList tasks={[]}>
        <p>Custom Empty</p>
      </OrdersList>
    </>
  );
});

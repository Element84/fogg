import React from 'react';
import { storiesOf } from '@storybook/react';

import OrdersList from '../../components/OrdersList';

const ordersData = [
  {
    id: '1234-325245',
    orderDate: '04/04/2019',
    status: 'accepted'
  },
  {
    id: '2346256-342632',
    orderDate: '04/07/2019',
    status: 'accepted'
  },
  {
    id: '3345324-45274',
    orderDate: '04/12/2019',
    status: 'accepted'
  }
];

const dataEmpty = [
  {
    id: undefined,
    orderDate: undefined,
    status: undefined
  },
  {
    id: undefined,
    orderDate: undefined,
    status: undefined
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

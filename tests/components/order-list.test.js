import React from 'react';
import { shallow } from 'enzyme';

import OrdersList from 'components/OrdersList';

describe('Orders List', () => {
  const ordersData = [
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

  const defaultColumns = ['Name', 'Window Open', 'Window Close', 'Status'];

  // const customColumns = [
  //   'Orders',
  //   'Starting Date',
  //   'Ending Date',
  //   'Current Status'
  // ];

  describe('Render', () => {
    const orderList = shallow(<OrdersList orders={ordersData} />);

    it('Should render a table with default headers', () => {
      const propColumns = orderList.find('Table').prop('columns');

      expect(propColumns).toEqual(defaultColumns);
    });
  });
});

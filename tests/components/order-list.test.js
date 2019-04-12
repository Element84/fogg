import React from 'react';
import { shallow } from 'enzyme';

import OrdersList from 'components/OrdersList';

describe('Orders List', () => {
  const ordersData = [
    {
      id: 1,
      name: 'Two Reams Premium Copy Paper',
      windowOpen: '04/04/2019',
      windowClose: '04/08/2019',
      status: 'accepted'
    },
    {
      id: 2,
      name: 'One Ream Premium Glossy Paper',
      windowOpen: '04/04/2019',
      windowClose: '04/08/2019',
      status: 'accepted'
    },
    {
      id: 3,
      name: ' 20 Pads Sticky Squares',
      windowOpen: '04/04/2019',
      windowClose: '04/08/2019',
      status: 'accepted'
    }
  ];

  const defaultColumns = ['Name', 'Window Open', 'Window Close', 'Status'];

  const customColumns = [
    'Orders',
    'Starting Date',
    'Ending Date',
    'Current Status'
  ];

  describe('Render', () => {
    const orderList = shallow(<OrdersList orders={ordersData} />);

    it('Should render a table with default headers', () => {
      const propColumns = orderList.find('Table').prop('columns');

      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = orderList.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(ordersData[0].name);
      expect(firstRow[1]).toEqual(ordersData[0].windowOpen);
      expect(firstRow[2]).toEqual(ordersData[0].windowClose);
      expect(firstRow[3]).toEqual(ordersData[0].status);
    });

    it('should render a button in the last cell', () => {
      const propRows = orderList.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const button = shallow(lastColumn);
      expect(button.hasClass('button')).toEqual(true);
    });
  });

  describe('Custom Headers', () => {
    const ordersList = shallow(
      <OrdersList headers={customColumns} orders={ordersData} />
    );

    it('should render a table with custom headers', () => {
      const propColumns = ordersList.find('Table').prop('columns');
      expect(propColumns).toEqual(customColumns);
    });
  });
});

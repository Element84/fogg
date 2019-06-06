import React from 'react';
import { shallow } from 'enzyme';

import { OrdersList } from '../../ui';

describe('Orders List', () => {
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

  const defaultColumns = ['Product', 'Order Date', 'Order Status', null];

  const customColumns = ['Order', 'Date Orders', 'Current Status'];

  describe('Render', () => {
    const orderList = shallow(<OrdersList orders={ordersData} />);

    it('Should render a table with default headers', () => {
      const propColumns = orderList.find('Table').prop('columns');

      expect(propColumns).toEqual(defaultColumns);
    });

    it('should render a table with the right row values', () => {
      const propRows = orderList.find('Table').prop('rows');
      const firstRow = propRows[0];
      expect(firstRow[0]).toEqual(ordersData[0].productIdentifier);
      expect(firstRow[1]).toEqual(ordersData[0].orderDate);
      expect(firstRow[2]).toEqual(ordersData[0].orderStatus);
    });

    it('should render a ListItemButton in the last cell', () => {
      const propRows = orderList.find('Table').prop('rows');
      const lastColumn = propRows[0][propRows[0].length - 1];
      const listItemButton = shallow(lastColumn);
      expect(listItemButton.find('Button')).toHaveLength(1);
      expect(
        listItemButton
          .find('Button')
          .findWhere(n => n.prop('to') === '/orders/1')
          .exists()
      ).toEqual(true);
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

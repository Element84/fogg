import React from 'react';
import { shallow } from 'enzyme';

import { OrderStatus } from '../../ui';

describe('Order Status', () => {
  const data = {
    orderId: 123456,
    orderStatus: 'delivered',
    orderDate: 1554782400000
  };
  describe('Render', () => {
    const orderStatus = shallow(<OrderStatus order={data} />);

    it('should render the correct order date', () => {
      const orderDate = orderStatus.find('.order-status-order-date').text();
      expect(orderDate).toEqual('Order Date: 04/09/2019');
    });

    it('should render a download button', () => {
      const button = orderStatus.find('.order-status-download-button').text();
      expect(button).toEqual('<Button />');
    });
  });
});

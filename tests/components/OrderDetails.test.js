import React from 'react';
import { shallow } from 'enzyme';

import { OrderDetails } from '../../ui';

describe('Order Details', () => {
  const data = {
    orderId: 123456,
    productIdentifier: 'Hylian Shield',
    orderStatus: 'delivered',
    orderDate: 1554782400000
  };
  describe('Render', () => {
    const orderDetails = shallow(<OrderDetails order={data} />);

    it('should render the correct product name', () => {
      const productIdentifier = orderDetails
        .find('.order-status-product-identifier')
        .text();
      expect(productIdentifier).toEqual(data.productIdentifier);
    });

    it('should render the correct id', () => {
      const orderId = orderDetails.find('.order-status-order-id').text();
      expect(orderId).toEqual(`ID: ${data.orderId}`);
    });

    it('should render the correct order date', () => {
      const orderDate = orderDetails.find('.order-status-order-date').text();
      expect(orderDate).toEqual('Order Date: 04/09/2019');
    });
  });
});

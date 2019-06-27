import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Product', 'Order Date', 'Order Status', null];

const OrdersList = ({ className, headers = DEFAULT_HEADERS, orders }) => {
  const rows = orders.map(
    ({ productIdentifier, orderDate, orderStatus, orderId }, index) => {
      return [
        productIdentifier,
        orderDate && formatDate(orderDate),
        orderStatus,
        orderId && (
          <ListItemButton
            key={`Order-Button-${index}`}
            itemType="orders"
            id={`${orderId}`}
          >
            View Order Details
          </ListItemButton>
        )
      ];
    }
  );
  return (
    <Table
      className={`orders-list ${className || ''}`}
      columns={headers}
      rows={rows}
    />
  );
};

OrdersList.propTypes = {
  headers: PropTypes.array,
  orders: PropTypes.array,
  className: PropTypes.string
};

export default OrdersList;

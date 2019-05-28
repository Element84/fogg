import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Product', 'Order Date', 'Order Status'];

const OrdersList = ({ headers = DEFAULT_HEADERS, orders }) => {
  const rows = orders.map(
    ({ productIdentifier, orderDate, orderStatus, orderId }, index) => {
      return [
        productIdentifier,
        formatDate(orderDate),
        orderStatus,
        <ListItemButton
          key={`Order-Button-${index}`}
          itemType="orders"
          id={`${orderId}`}
          // id="0123456"
        >
          View Order Details
        </ListItemButton>
        // <Button key={`OrdersList-Button-${index}`} />
      ];
    }
  );
  return <Table columns={headers} rows={rows} />;
};

OrdersList.propTypes = {
  headers: PropTypes.array,
  orders: PropTypes.array
};

export default OrdersList;

import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Product', 'Order Date', 'Order Status'];

const OrdersList = ({ headers = DEFAULT_HEADERS, orders }) => {
  const rows = orders.map(
    ({ productIdentifier, orderDate, orderStatus }, index) => {
      return [
        productIdentifier,
        formatDate(orderDate),
        orderStatus,
        <ListItemButton
          key={`Order-Button-${index}`}
          itemType="order"
          // id={order.id.toString()}
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

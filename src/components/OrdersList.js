import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Order Id', 'Order Date', 'Order Status', null];

const OrdersList = ({
  children,
  className,
  headers = DEFAULT_HEADERS,
  orders = []
}) => {
  const rows = orders.map(({ orderDate, status, id }, index) => {
    return [
      id,
      orderDate && formatDate(orderDate),
      status,
      id && (
        <ListItemButton
          key={`Order-Button-${index}`}
          itemType="orders"
          id={`${id}`}
        >
          View Order Details
        </ListItemButton>
      )
    ];
  });
  return (
    <Table
      className={`orders-list ${className || ''}`}
      columns={headers}
      rows={rows}
    >
      {rows.length === 0 && <>{children || <p>No available orders</p>}</>}
    </Table>
  );
};

OrdersList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  headers: PropTypes.array,
  orders: PropTypes.array,
  className: PropTypes.string
};

export default OrdersList;

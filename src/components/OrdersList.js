import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Name', 'Window Open', 'Window Close', 'Status'];

const OrdersList = ({ headers = DEFAULT_HEADERS, orders }) => {
  const rows = orders.map(
    ({ name, windowOpen, windowClose, status }, index) => {
      return [
        name,
        formatDate(windowOpen),
        formatDate(windowClose),
        status,
        <Button key={`OrdersList-Button-${index}`} />
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

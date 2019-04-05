import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

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

function formatDate (dateTime) {
  let date = new Date(dateTime);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return (date = mm + '/' + dd + '/' + yyyy);
}

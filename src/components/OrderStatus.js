import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import StatusIndicator from './StatusIndicator';

import { formatDate } from '../lib/datetime';

const STATUS_LIST = [
  {
    label: 'Pending',
    id: 'pending'
  },
  {
    label: 'Approved',
    id: 'approved'
  },
  {
    label: 'Shipped',
    id: 'shipped'
  },
  {
    label: 'Delivered',
    id: 'delivered'
  }
];

const ERROR_LIST = [
  {
    label: 'Rejected',
    id: 'rejected'
  },
  {
    label: 'Cancelled',
    id: 'cancelled'
  },
  {
    label: 'Unavailable',
    id: 'unavailable'
  }
];

const OrderStatus = ({ order = {}, disabled = false }) => {
  const { orderStatus, orderDate } = order;

  return (
    <div className="order-status">
      <section className="order-status-status-info-wrapper">
        <div className="order-status-status-indicator">
          <StatusIndicator
            activeId={orderStatus}
            statusList={STATUS_LIST}
            errorList={ERROR_LIST}
          />
        </div>
        <p className="order-status-order-date">
          <strong>Order Date: {formatDate(orderDate)}</strong>
        </p>
        <div className="order-status-download-button">
          {/* TODO ensure this button downloads orders */}
          <Button disabled={disabled}>Download</Button>
        </div>
      </section>
    </div>
  );
};

OrderStatus.propTypes = {
  order: PropTypes.object,
  disabled: PropTypes.bool
};

export default OrderStatus;

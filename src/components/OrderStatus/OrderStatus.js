import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '../../lib/datetime';

import Button from '../Button';
import StatusIndicator from '../StatusIndicator';

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
    label: 'Completed',
    id: 'completed'
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
    label: 'Failed',
    id: 'failed'
  },
  {
    label: 'Unavailable',
    id: 'unavailable'
  }
];

const OrderStatus = ({ order = {}, disabled = false, onClick }) => {
  const { status, orderDate } = order;

  function handleClick (e) {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  }

  return (
    <div className="order-status">
      <div className="order-status-status-info-wrapper">
        <div className="order-status-column">
          <div className="order-status-status-indicator">
            <StatusIndicator
              activeId={status}
              statusList={STATUS_LIST}
              errorList={ERROR_LIST}
            />
          </div>
        </div>
        <div className="order-status-column">
          <p className="order-status-order-date">
            <strong>Order Date: {formatDate(orderDate)}</strong>
          </p>
          <div className="order-status-download-button">
            <Button disabled={disabled} onClick={handleClick}>
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderStatus.propTypes = {
  order: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default OrderStatus;

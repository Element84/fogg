import React from 'react';
import PropTypes from 'prop-types';

import StatusIndicator from './StatusIndicator';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Order Date'];

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

const OrderStatus = ({ headers = DEFAULT_HEADERS, order = {} }) => {
  const { orderId, productIdentifier, orderStatus, orderDate } = order;

  return (
    <div className="order-status">
      <section className="order-status-info">
        <div className="order-status-order-id">{orderId}</div>
        <div className="order-status-product-identifier">
          {productIdentifier}
        </div>
        <div className="order-status-status-indicator">
          <StatusIndicator
            activeId={orderStatus}
            statusList={STATUS_LIST}
            errorList={ERROR_LIST}
          />
        </div>
        <div className="order-status-order-date">
          <p className="order-status-info order-status-info-order-date">
            {headers[0]}
          </p>
          <p className="order-status-info order-status-order-date">
            {formatDate(orderDate)}
          </p>
        </div>
      </section>
    </div>
  );
};

OrderStatus.propTypes = {
  headers: PropTypes.array,
  order: PropTypes.object
};

export default OrderStatus;

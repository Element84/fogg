import React from 'react';
import PropTypes from 'prop-types';
import { FaDatabase } from 'react-icons/fa';

import Button from './Button';
import StatusIndicator from './StatusIndicator';
import Table from './Table';
import WonderLink from './WonderLink';

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

const tableColumns = ['Name', 'Value'];

const tableRows = [['Granule ID', 1234567], ['Collection ID', 1234567]];
// we may not have a productIdentifier (name) to deal with

const OrderStatus = ({ order = {}, disabled = false }) => {
  const { orderId, productIdentifier, orderStatus, orderDate } = order;

  return (
    <div className="order-status">
      <section className="order-status-info">
        {/* TODO make sure that this links back to the orders page */}
        <p className="order-status-back-button">
          <WonderLink to="/">{`< Back to Orders`}</WonderLink>
        </p>
        <section className="order-status-order-header">
          <h1 className="order-status-order-icon">
            <FaDatabase />
          </h1>
          <div className="order-status-product-identifier">
            {productIdentifier}
          </div>
          <div className="order-status-order-id">ID: {orderId}</div>
        </section>
        <section className="order-status-status-info-wrapper">
          <div className="order-status-status-indicator">
            <StatusIndicator
              activeId={orderStatus}
              statusList={STATUS_LIST}
              errorList={ERROR_LIST}
            />
          </div>
          <p className="order-status-info order-status-order-date">
            <strong>Order Date: {formatDate(orderDate)}</strong>
          </p>
          <div className="order-status-download-button">
            {/* TODO ensure this button downloads orders */}
            <Button disabled={disabled}>Download</Button>
          </div>
        </section>
        <div className="order-status-data">
          <strong>Data</strong>
          <Table columns={tableColumns} rows={tableRows} />
        </div>
      </section>
    </div>
  );
};

OrderStatus.propTypes = {
  headers: PropTypes.array,
  order: PropTypes.object,
  disabled: PropTypes.bool
};

export default OrderStatus;

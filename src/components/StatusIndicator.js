import React from 'react';
import PropTypes from 'prop-types';

const status = [
  'pending',
  'accepted',
  'rejected',
  'partially completed',
  'cancelled',
  'anomaly',
  'completed'
];

const activeRed = null;
const active = statusCircle.map(i => {});

const StatusIndicator = ({ status }) => {
  if (status === 'pending') {
    return 0 && active;
  } else if (status === 'rejected' || 'cancelled' || 'anomally') {
    return 0 && activeRed;
  } else if (status === 'accepted') {
    return 1 && active;
  } else if (status === 'partially completed') {
    return 2 && active;
  } else if (status === 'completed') {
    return 3 && active;
  } else {
    // maybe this should return err
    return 0 && active;
  }
  return (
    <>
      <section className="status-indicator-circles">
        <div className="status-indicator-circle" />
        <div className="status-indicator-circle" />
        <div className="status-indicator-circle" />
        <div className="status-indicator-circle" />
      </section>
    </>
  );
  // make 4 circles 0 - 3
  // make circle active based on number returned
  // if circle also returns another var change color based on var
};

export default StatusIndicator;

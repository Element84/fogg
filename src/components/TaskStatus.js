import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Window Open', 'Window Close']

const TaskStatus = ({ headers={DEFAULT_HEADERS}, task }) => {
  const statusBox = task.map(({ status, windowOpen, windowClose }, index) => {
    return [
      <div key={`status-headers-${index}`}>
        <p
          key={`status-headers-${index}`}
          className="status-info status-info-window-open"
        >
          {DEFAULT_HEADERS[0]}
        </p>
        <p key={`status-info-${index}`} className="status-info">
          {formatDate(windowOpen)}
        </p>
      </div>,
      <p
        key={`status-info-${index}`}
        className="status-info status-info-status"
      >
        {status}
      </p>,
      <div key={`status-headers-${index}`}>
        <p
          key={`status-headers-${index}`}
          className="status-info status-info-window-close"
        >
          {DEFAULT_HEADERS[1]}
        </p>
        <p key={`status-info-${index}`}>{formatDate(windowClose)}</p>
      </div>
    ];
  });

  return (
    <>
      <div className="task-status">
        <div className="task-status-info-wrapper">
          <section className="task-status-info">{statusBox}</section>
        </div>
      </div>
    </>
  );
};

TaskStatus.propTypes = {
  task: PropTypes.array
};

export default TaskStatus;

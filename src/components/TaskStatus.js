import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { formatDate } from '../lib/datetime';

const TaskStatus = ({ task }) => {
  const statusBox = task.map(({ status, windowOpen, windowClose }, index) => {
    // headers === key value of windowOpen and windowClose split out into two words => Window Open && Window Close
    // flex-direction: columns on WO && WC headers and values
    // flex-direction: rows on everything
    // wo ___ wc
    // v stat v
    return [
      <div key={`status-headers-${index}`}>
        <p
          key={`status-headers-${index}`}
          className="status-info status-info-window-open"
        >
          {Object.keys({ windowOpen })}
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
          {Object.keys({ windowClose })}
        </p>
        <p key={`status-info-${index}`}>{formatDate(windowClose)}</p>
      </div>
    ];
  });

  return (
    <>
      <div className="task-status">
        <section className="task-status-meta">
          <Button />
          <section className="task-status-meta-data">
            <p>{task[0].name}</p>
            <p>ID: {task[0].id}</p>
          </section>
        </section>
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

import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { formatDate } from '../lib/datetime';

const TaskStatus = ({ task }) => {
  const statusBox = task.map(({ status, windowOpen, windowClose }, index) => {
    return [
      <p key={`status-info-${index}`} className="status-info">
        {formatDate(windowOpen)}
      </p>,
      // <b key={`status-info-${index}`}>
      <p
        key={`status-info-${index}`}
        className="status-info status-info-status"
      >
        {status}
      </p>,
      // </b>,
      <p key={`status-info-${index}`} className="status-info">
        {formatDate(windowClose)}
      </p>
    ];
  });

  const headers = task.map(({ windowOpen, windowClose }, index) => {
    return [
      <p key={`status-headers-${index}`}>{Object.keys({ windowOpen })}</p>,
      <p key={`status-headers-${index}`}>{Object.keys({ windowClose })}</p>
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
          <section className="task-status-headers-wrapper">
            <section className="task-status-headers">{headers}</section>
          </section>
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

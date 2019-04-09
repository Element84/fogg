import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { formatDate } from '../lib/datetime';

const TaskStatus = ({ header, task }) => {
  const statusBox = task.map(({ status, windowOpen, windowClose }, index) => {
    return [
      // <p>Window Open</p>,
      <p key={index}>{formatDate(windowOpen)}</p>,
      <b key={index}>
        <p key={index}>{status}</p>
      </b>,
      // <p>Window Close</p>,
      <p key={index}>{formatDate(windowClose)}</p>
    ];
  });
  return (
    <>
      <div className="task-status">
        <section className="task-status-header">
          <Button />
          <section className="task-status-header-info">
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
  header: PropTypes.array,
  task: PropTypes.array
};

export default TaskStatus;

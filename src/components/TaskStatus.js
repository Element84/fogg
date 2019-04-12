import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import StatusIndicator from './StatusIndicator';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Window Open', 'Window Close'];

const STATUS_LIST = [
  {
    label: 'Pending',
    id: 'pending'
  },
  {
    label: 'Accepted',
    id: 'accepted'
  },
  {
    label: 'Partially Completed',
    id: 'partially-completed'
  },
  {
    label: 'Completed',
    id: 'completed'
  }
];

const TaskStatus = ({ headers = DEFAULT_HEADERS, task }) => {
  const { status, windowOpen, windowClose } = task;

  return (
    <div className="task-status">
      <div className="task-status-info-wrapper">
        <section className="task-status-info">
          <div>
            <p className="status-info status-info-window-open">{headers[0]}</p>
            <p className="status-info">{formatDate(windowOpen)}</p>
          </div>

          <div>
            <StatusIndicator activeId={task.status} statusList={STATUS_LIST} />
          </div>

          <div>
            <p className="status-info status-info-window-close">{headers[1]}</p>
            <p>{formatDate(windowClose)}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

TaskStatus.propTypes = {
  task: PropTypes.array
};

export default TaskStatus;

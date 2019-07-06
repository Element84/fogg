import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Name', 'Window Open', 'Window Close', 'Status', null];

const TaskList = ({
  children,
  className,
  headers = DEFAULT_HEADERS,
  tasks = []
}) => {
  const rows = tasks.map((task = {}, index) => {
    const { id, properties = {} } = task;
    return [
      properties.targetName,
      properties.windowOpen && formatDate(properties.windowOpen),
      properties.windowClose && formatDate(properties.windowClose),
      properties.status,
      id && (
        <ListItemButton
          key={`Task-Button-${index}`}
          itemType="tasks"
          id={`${id}`}
        >
          View Task Details
        </ListItemButton>
      )
    ];
  });
  return (
    <Table
      className={`task-list ${className || ''}`}
      columns={headers}
      rows={rows}
    >
      {rows.length === 0 && <>{children || <p>No available tasks</p>}</>}
    </Table>
  );
};

TaskList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  headers: PropTypes.array,
  tasks: PropTypes.array,
  className: PropTypes.string
};

export default TaskList;

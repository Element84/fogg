import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Name', 'Window Open', 'Window Close', 'Status'];

const TaskList = ({ headers = DEFAULT_HEADERS, task }) => {
  const rows = task.map(({ name, windowOpen, windowClose, status }, index) => {
    return [
      name,
      formatDate(windowOpen),
      formatDate(windowClose),
      status,
      <Button key={`Task-Button-${index}`} />
    ];
  });
  return <Table columns={headers} rows={rows} />;
};

TaskList.propTypes = {
  headers: PropTypes.array,
  task: PropTypes.array
};

export default TaskList;

import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

// take a task by user
// put a date on it
// add a status
// add a button

const DEFAULT_HEADERS = ['Name', 'Date', 'Status'];

const Task = ({ headers = DEFAULT_HEADERS, task }) => {
  const rows = task.map(({ name, date, status }, index) => {
    return [name, date, status, <Button key={`Task-Button-${index}`} />];
  });
  return <Table columns={headers} rows={rows} />;
};

Task.propTypes = {
  headers: PropTypes.array,
  task: PropTypes.array
};

export default Task;

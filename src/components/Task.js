import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

const DEFAULT_HEADERS = ['Name', 'Date', 'Status'];

const Task = ({ headers = DEFAULT_HEADERS, task }) => {
  let date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  date = mm + '/' + dd + '/' + yyyy;

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

import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

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

function formatDate (dateTime) {
  let date = new Date(dateTime);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return (date = mm + '/' + dd + '/' + yyyy);
}

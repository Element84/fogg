import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import ListItemButton from './ListItemButton';

import { formatDate } from '../lib/datetime';

const DEFAULT_HEADERS = ['Name', 'Window Open', 'Window Close', 'Status'];

const TaskList = ({ headers = DEFAULT_HEADERS, tasks }) => {
  const rows = tasks.map(
    ({ name, windowOpen, windowClose, status, id }, index) => {
      return [
        name,
        formatDate(windowOpen),
        formatDate(windowClose),
        status,
        <ListItemButton key={`Task-Button-${index}`} listType={'task'} id={id}>
          View Task Details
        </ListItemButton>
      ];
    }
  );
  return <Table columns={headers} rows={rows} />;
};

TaskList.propTypes = {
  headers: PropTypes.array,
  tasks: PropTypes.array
};

export default TaskList;

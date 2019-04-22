import React from 'react';
import { storiesOf } from '@storybook/react';

import TaskStatus from '../../components/TaskStatus';

/* statuses
pending, accepted, rejected,
partially completed, cancelled, anomaly,
completed */

const data = [
  {
    id: 221,
    name: 'Make Dwight Smack Himself in the Face',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'partially completed'
  }
];

const error = [
  {
    id: 223,
    name: 'Beat Dwight in a Snowball Fight',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'rejected'
  }
];

const unknown = [
  {
    id: 223,
    name: 'Beat Dwight in a Snowball Fight',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'not happening'
  }
]

const headers = ['Window Open', 'Window Close'];

const stories = storiesOf('Components|TaskStatus', module);

stories.add('Default', () => {
  return data.map(task => {
    return <TaskStatus headers={headers} task={task} />;
  });
});

stories.add('Error', () => {
  return error.map(task => {
    return <TaskStatus headers={headers} task={task} />
  })
})

stories.add('Unknown', () => {
  return unknown.map(task => {
    return <TaskStatus headers={headers} task={task} />
  })
})
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
    status: 'partially-completed'
  },
  {
    id: 222,
    name: 'Make Dwight Smack Himself in the Face',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'accepted'
  },
  {
    id: 222,
    name: 'Make Dwight Smack Himself in the Face',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'completed'
  },
  {
    id: 221,
    name: 'Make Dwight Smack Himself in the Face',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'partially-completed'
  }
];

const rejected = [
  {
    id: 223,
    name: 'Beat Dwight in a Snowball Fight',
    windowOpen: 1554416208102,
    windowClose: 1554782400000,
    status: 'rejected'
  }
];

const headers = ['Window Open', 'Window Close'];

const stories = storiesOf('Components|TaskStatus', module);

stories.add('Default', () => {
  return data.map(task => {
    return <TaskStatus headers={headers} task={task} />;
  });
});

// stories.add('Non Default Status', () => {
//   return rejected.map(task => {
//     return <TaskStatus headers={headers} task={task} />
//   })
// })

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
  }
];

const headers = ['Window Open', 'Window Close'];

const stories = storiesOf('Components|TaskStatus', module);

stories.add('Default', () => {
  return data.map(task => {
    return <TaskStatus headers={headers} task={task} />;
  });
});

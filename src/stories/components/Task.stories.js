import React from 'react';
import { storiesOf } from '@storybook/react';

import Task from '../../components/Task';
// import Table from '../../components/Table';

/* statuses
pending, accepted, rejected,
partially completed, cancelled, anomaly,
completed */

const data = [
  {
    id: 1,
    name: 'Put nickles in Dwights phone',
    date: 'today',
    status: 'Completed'
  },
  {
    id: 2,
    name: 'Defeat Dwight in a snowball fight',
    date: 'today',
    status: 'Anomaly'
  },
  {
    id: 3,
    name: 'Put more nickles in Dwights phone',
    date: 'tomorrow',
    status: 'Pending'
  },
  {
    id: 4,
    name: 'Yet more nickles',
    date: 'monday',
    status: 'Pending'
  },
  {
    id: 5,
    name: 'Remove nickles so he smacks himself in the face',
    date: 'Tuesday',
    status: 'Partially Completed'
  }
];

const columns = ['Task', 'Planned Date', 'Current Status'];

const stories = storiesOf('Components|Task', module);

stories.add('Default', () => {
  return <Task task={data} />;
});

stories.add('Custom Headers', () => {
  return <Task headers={columns} task={data} />;
});

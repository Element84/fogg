import React from 'react';
import { storiesOf } from '@storybook/react';

import StatusIndicator from '../../components/StatusIndicator';

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
    status: 'Partially Completed'
  }
];

const headers = ['Window Open', 'Window Close'];

const stories = storiesOf('Components|TaskStatus', module);

stories.add('Default', () => {
  return <TaskStatus headers={headers} task={data} />;
});

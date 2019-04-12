import React from 'react';
import { storiesOf } from '@storybook/react';

import StatusIndicator from '../../components/StatusIndicator';

/* statuses
pending, accepted, rejected,
partially completed, cancelled, anomaly,
completed */

// const data = [
//   {
//     id: 221,
//     name: 'Make Dwight Smack Himself in the Face',
//     windowOpen: 1554416208102,
//     windowClose: 1554782400000,
//     status: 'Partially Completed'
//   }
// ];

const status = 'pending'

const stories = storiesOf('Components|StatusIndicator', module);

stories.add('Default', () => {
  return <StatusIndicator status={status} />;
});

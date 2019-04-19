import React from 'react';
import { storiesOf } from '@storybook/react';

import StatusIndicator from '../../components/StatusIndicator';

/* statuses
pending, accepted, rejected,
partially completed, cancelled, anomaly,
completed */

const stories = storiesOf('Components|StatusIndicator', module);

stories.add('Default', () => {
  const statusList = [
    {
      label: 'Pending',
      id: 'pending'
    },
    {
      label: 'Accepted',
      id: 'accepted'
    },
    {
      label: 'Partially Completed',
      id: 'partially-completed'
    },
    {
      label: 'Completed',
      id: 'completed'
    }
  ];

  return (
    <StatusIndicator activeId={statusList[1].id} statusList={statusList} />
  );
});

stories.add('Error', () => {
  const errorList = [
    {
      label: 'Rejected',
      id: 'rejected'
    },
    {
      label: 'Canceled',
      id: 'canceled'
    },
    {
      label: 'Anomoly',
      id: 'anomoly'
    }
  ];

  return (
    <StatusIndicator
      activeId={errorList[2].id}
      statusList={errorList}
      errorList={errorList}
    />
  );
});

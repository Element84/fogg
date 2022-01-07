import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import StatusIndicator from '../';

const STORY_COMPONENT = 'Status Indicator';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StatusIndicator activeId={statusList[1].id} statusList={statusList} />
    </Story>
  );
});

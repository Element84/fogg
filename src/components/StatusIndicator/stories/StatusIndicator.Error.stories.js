import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import StatusIndicator from '../';

const STORY_COMPONENT = 'Status Indicator';
const STORY_NAME = 'Error';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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
    label: 'Anomolly',
    id: 'anomolly'
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <StatusIndicator
        activeId={errorList[2].id}
        statusList={errorList}
        errorList={errorList}
      />
    </Story>
  );
});

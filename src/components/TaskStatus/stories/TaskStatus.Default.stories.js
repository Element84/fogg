import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import TaskStatus from '../';

const STORY_COMPONENT = 'Task Status';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const data = {
  id: 221,
  name: 'Make Dwight Smack Himself in the Face',
  windowOpen: 1554416208102,
  windowClose: 1554782400000,
  status: 'partially completed'
};

const headers = ['Window Open', 'Window Close'];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskStatus headers={headers} task={data} />
    </Story>
  );
});

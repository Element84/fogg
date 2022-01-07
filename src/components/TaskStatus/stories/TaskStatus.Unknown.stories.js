import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import TaskStatus from '../';

const STORY_COMPONENT = 'Task Status';
const STORY_NAME = 'Unknown';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const unknown = {
  id: 223,
  name: 'Beat Dwight in a Snowball Fight',
  windowOpen: 1554416208102,
  windowClose: 1554782400000,
  status: 'not happening'
};

const headers = ['Window Open', 'Window Close'];

stories.add('Unknown', () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskStatus headers={headers} task={unknown} />
    </Story>
  );
});

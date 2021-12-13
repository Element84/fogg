import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';

import TaskAction from '../';

const STORY_COMPONENT = 'Task Action';
const STORY_NAME = 'Info Only';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskAction>
        <div className="task-action-children-example">
          <span>Estimated Total*</span>
          <span>$970.12</span>
          <span>*Resulting charges may be lower than estimated</span>
        </div>
      </TaskAction>
    </Story>
  );
});

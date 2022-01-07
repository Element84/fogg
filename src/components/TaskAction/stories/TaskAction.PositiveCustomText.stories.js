import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import TaskAction from '../';

const STORY_COMPONENT = 'Task Action';
const STORY_NAME = 'Positive Custom Text';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const positiveCustom = {
  onSubmit: handlePositiveClick,
  label: 'Request Positive'
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskAction positive={positiveCustom}>
        <div className="task-action-children-example">
          <span>Estimated Total*</span>
          <span>$970.12</span>
          <span>*Resulting charges may be lower than estimated</span>
        </div>
      </TaskAction>
    </Story>
  );
});

/**
 * handlePositiveClick
 */

function handlePositiveClick (e) {
  action(`${STORY_COMPONENT}::onPositiveClick`)(e);
}

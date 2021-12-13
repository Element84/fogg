import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import TaskAction from '../';

const STORY_COMPONENT = 'Task Action';
const STORY_NAME = 'Negative Custom Text';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const negativeCustom = {
  onSubmit: handleNegativeClick,
  label: 'Cancel Negative'
};

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskAction negative={negativeCustom}>
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
 * handleNegativeClick
 */

function handleNegativeClick (e) {
  action(`${STORY_COMPONENT}::onNegativeClick`)(e);
}

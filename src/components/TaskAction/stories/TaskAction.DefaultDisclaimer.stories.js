import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import TaskAction from '../';

const STORY_COMPONENT = 'Task Action';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const positiveDefault = {
  onSubmit: handlePositiveClick,
  disclaimer: 'Positive Disclaimer!'
};

const negativeDefault = {
  onSubmit: handleNegativeClick,
  disclaimer: 'Negative Disclaimer!'
};

stories.add('Default w/ Disclaimer', () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <TaskAction positive={positiveDefault} negative={negativeDefault}>
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

/**
 * handleNegativeClick
 */

function handleNegativeClick (e) {
  action(`${STORY_COMPONENT}::onNegativeClick`)(e);
}

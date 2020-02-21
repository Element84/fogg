import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TaskAction from '../../components/TaskAction';

const stories = storiesOf('Components|TaskAction', module);

function handlePositiveClick (e) {
  action('TaskAction::onPositiveClick')(e);
}

function handleNegativeClick (e) {
  action('TaskAction::onNegativeClick')(e);
}

stories.add('Default', () => {
  return (
    <TaskAction
      onPositiveSubmit={handlePositiveClick}
      onNegativeSubmit={handleNegativeClick}
    >
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

stories.add('Info only', () => {
  return (
    <TaskAction>
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

stories.add('Positive', () => {
  return (
    <TaskAction onPositiveSubmit={handlePositiveClick}>
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

stories.add('Negative', () => {
  return (
    <TaskAction onNegativeSubmit={handleNegativeClick}>
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

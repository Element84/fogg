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
const positiveDefault = {
  onSubmit: handlePositiveClick
};

const negativeDefault = {
  onSubmit: handleNegativeClick
};

const positiveCustom = {
  onSubmit: handlePositiveClick,
  label: 'Request Positive'
};

const negativeCustom = {
  onSubmit: handleNegativeClick,
  label: 'Cancel Negative'
};

stories.add('Default', () => {
  return (
    <TaskAction positive={positiveDefault} negative={negativeDefault}>
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

stories.add('Positive Custom Text', () => {
  return (
    <TaskAction positive={positiveCustom}>
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

stories.add('Negative Custom Text', () => {
  return (
    <TaskAction negative={negativeCustom}>
      <div className="task-action-children-example">
        <span>Estimated Total*</span>
        <span>$970.12</span>
        <span>*Resulting charges may be lower than estimated</span>
      </div>
    </TaskAction>
  );
});

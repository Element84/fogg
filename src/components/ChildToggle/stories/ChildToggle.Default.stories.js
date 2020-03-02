import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import ChildToggle from '../';
import FormInput from '../../FormInput';
import FormRow from '../../FormRow';

const STORY_COMPONENT = 'Child Toggle';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

const intervalOptions = [
  {
    value: 'hours',
    label: 'Hours'
  },
  {
    value: 'days',
    label: 'Days'
  },
  {
    value: 'weeks',
    label: 'Weeks'
  }
];

stories.add('Default', () => {
  function handleToggleOnChange (e, { isChecked }) {
    action(`${STORY_COMPONENT}::toggle`)(e, `Is Checked: ${isChecked}`);
  }

  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ChildToggle label="Repeat" id="repeater" onChange={handleToggleOnChange}>
        <FormRow className="repeater-row">
          <FormInput
            type="select"
            id="interval"
            label="Interval"
            options={intervalOptions}
          />
        </FormRow>
        <FormRow className="repeater-row" col={2}>
          <FormInput type="text" id="separation-min" abel="Separation Min" />
          <FormInput type="text" id="separation-max" label="Separation Max" />
        </FormRow>
        <FormRow className="repeater-row" col={2}>
          <FormInput type="text" id="max-collections" label="Max Collections" />
        </FormRow>
      </ChildToggle>
    </Story>
  );
});

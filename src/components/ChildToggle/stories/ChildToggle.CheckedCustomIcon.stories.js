import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaTimes } from 'react-icons/fa';

import Story from '../../../../stories/helpers/Story';

import ChildToggle from '../';
import FormInput from '../../FormInput';
import FormRow from '../../FormRow';

const STORY_COMPONENT = 'Child Toggle';
const STORY_NAME = 'Checked with Custom Icon';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

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

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <ChildToggle
        label="Repeat"
        id="repeater"
        isChecked={true}
        icon={<FaTimes />}
      >
        <FormRow className="repeater-row">
          <FormInput
            type="select"
            id="interval"
            label="Interval"
            options={intervalOptions}
          />
        </FormRow>
        <FormRow className="repeater-row" col={2}>
          <FormInput type="text" id="separation-min" label="Separation Min" />
          <FormInput type="text" id="separation-max" label="Separation Max" />
        </FormRow>
        <FormRow className="repeater-row" col={2}>
          <FormInput type="text" id="max-collections" label="Max Collections" />
        </FormRow>
      </ChildToggle>
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaTimes } from 'react-icons/fa';
import { action } from '@storybook/addon-actions';

import ChildToggle from './';
import FormInput from '../FormInput';
import FormRow from '../FormRow';

const stories = storiesOf('Components|ChildToggle', module);

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
    action('toggle')(e, `Is Checked: ${isChecked}`);
  }

  return (
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
  );
});

stories.add('Checked, Custom Icon', () => {
  return (
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
  );
});

stories.add('Is Field', () => {
  return (
    <ChildToggle label="Repeat" id="repeater" isField={true}>
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
  );
});

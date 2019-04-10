import React from 'react';
import { storiesOf } from '@storybook/react';
import Repeater from '../../components/Repeater';
import FormInput from '../../components/FormInput';
import RepeaterRow from '../../components/RepeaterRow';

const stories = storiesOf('Components|Repeater', module);

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
  return (
    <Repeater>
      <RepeaterRow>
        <FormInput type="select" label="Interval" options={intervalOptions} />
      </RepeaterRow>
      <RepeaterRow col={2}>
        <FormInput type="text" label="Separation Min" />
        <FormInput type="text" label="Separation Max" />
      </RepeaterRow>
      <RepeaterRow col={2}>
        <FormInput type="text" label="Max Collections" />
      </RepeaterRow>
    </Repeater>
  );
});

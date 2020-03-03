import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Initial Value';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

const SELECT_OPTIONS = [
  {
    label: 'Bender',
    value: 'rodriguez'
  },
  {
    label: 'John',
    value: 'zoidberg'
  },
  {
    label: 'Slurms',
    value: 'mckenzie'
  }
];

stories.add(STORY_NAME, () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInput
          id="initial-text"
          label="Initial Text"
          defaultValue="My Text"
        />
        <FormInput
          id="initial-email"
          label="Initial Email"
          type="email"
          defaultValue="My Email"
        />
        <FormInput
          id="initial-select"
          label="Initial Select"
          type="select"
          options={SELECT_OPTIONS}
          defaultValue="zoidberg"
        />
        <FormInput
          id="initial-textarea"
          label="Initial Textarea"
          type="textarea"
          defaultValue="My Textarea"
        />
        <FormInput
          id="initial-datetime"
          label="Initial Datetime"
          type="datetime"
          value="06/07/2019 12:00 PM"
        />
        <FormInput
          id="initial-datalist"
          label="Initial Datalist"
          value="Fry"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
        />
      </BaseForm>
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Default';

const stories = storiesOf(
  `Components|${STORY_COMPONENT}|${STORY_NAME}`,
  module
);

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
  function handleSelectOnChange (field, selectEvent) {
    action('select :: onchange')(field, selectEvent);
  }
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInput id="default-text" label="Default Text" />
        <FormInput id="default-email" label="Default Email" type="email" />
        <FormInput
          id="default-password"
          label="Default Password"
          type="password"
        />
        <FormInput id="default-number" label="Default Number" type="number" />
        <FormInput
          id="default-select"
          label="Default Select"
          type="select"
          options={SELECT_OPTIONS}
          onChange={handleSelectOnChange}
        />
        <FormInput
          id="default-textarea"
          label="Default Textarea"
          type="textarea"
        />
        <FormInput
          id="default-datetime"
          label="Default Datetime"
          type="datetime"
        />
        <FormInput
          id="default-datetime-utc"
          label="Default Datetime UTC"
          type="datetime"
          utc={true}
        />
        <FormInput
          id="default-datalist"
          label="Default Datalist"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
        />
      </BaseForm>
    </Story>
  );
});

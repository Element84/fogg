import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Required';

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
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <BaseForm>
        <FormInput id="required-text" label="Required Text" required={true} />
        <FormInput
          id="required-email"
          label="Required Email"
          type="email"
          required={true}
        />
        <FormInput
          id="required-select"
          label="Required Select"
          type="select"
          options={SELECT_OPTIONS}
          required={true}
        />
        <FormInput
          id="required-textarea"
          label="Required Textarea"
          type="textarea"
          required={true}
        />
        <FormInput
          id="required-datalist"
          label="Required Datalist"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
          required={true}
        />
      </BaseForm>
    </Story>
  );
});

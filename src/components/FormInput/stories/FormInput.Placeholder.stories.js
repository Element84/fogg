import React from 'react';
import { storiesOf } from '@storybook/react';

import Story from '../../../../stories/helpers/Story';
import BaseForm from '../../../../stories/helpers/BaseForm';

import FormInput from '../';

const STORY_COMPONENT = 'Form Input';
const STORY_NAME = 'Placeholder';

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
        <p>
          Note: Placeholders are not always an ideal user experience and can
          lead to confusion.
        </p>
        <FormInput
          id="placeholder-text"
          label="Placeholder Text"
          placeholder="Enter your text"
        />
        <FormInput
          id="placeholder-email"
          label="Placeholder Email"
          type="email"
          placeholder="Enter your email"
        />
        <FormInput
          id="placeholder-select"
          label="Placeholder Select"
          type="select"
          options={SELECT_OPTIONS}
          placeholder="Custom please select"
        />
        <FormInput
          id="placeholder-textarea"
          label="Placeholder Textarea"
          type="textarea"
          placeholder="Enter your textarea"
        />
        <FormInput
          id="placeholder-datalist"
          label="Placeholder Datalist"
          placeholder="Why not?"
          dataList={['Fry', 'Leela', 'Zoidberg', 'Bender']}
        />
      </BaseForm>
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';

import FormRow from './';
import FormInput from '../FormInput';
import BaseForm from '../../../stories/helpers/BaseForm';

const stories = storiesOf('Components|FormRow', module);

stories.add('Default', () => {
  return (
    <BaseForm>
      <FormRow>
        <FormInput id="default-text" label="Default Text" />
        <FormInput id="default-text" label="Default Text" />
      </FormRow>
      <FormRow>
        <FormInput id="default-text" label="Default Text" />
        <FormInput id="default-text" label="Default Text" />
      </FormRow>
      <FormRow>
        <FormInput id="default-text" label="Default Text" />
        <FormInput id="default-text" label="Default Text" />
      </FormRow>
    </BaseForm>
  );
});

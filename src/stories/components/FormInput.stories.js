import React from 'react';
import { storiesOf } from '@storybook/react';

import FormInput from '../../components/FormInput';
import BaseForm from '../helpers/BaseForm';

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

const stories = storiesOf('Components|FormInput', module);

stories.add('Default', () => {
  return (
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
      />
      <FormInput
        id="default-textarea"
        label="Default Textarea"
        type="textarea"
      />
    </BaseForm>
  );
});

stories.add('Required', () => {
  return (
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
    </BaseForm>
  );
});

stories.add('Disabled', () => {
  return (
    <BaseForm>
      <FormInput id="disabled-text" label="Disabled Text" disabled={true} />
      <FormInput
        id="disabled-email"
        label="Disabled Email"
        type="email"
        disabled={true}
      />
      <FormInput
        id="disabled-select"
        label="Disabled Select"
        type="select"
        options={SELECT_OPTIONS}
        disabled={true}
      />
      <FormInput
        id="disabled-textarea"
        label="Disabled Textarea"
        type="textarea"
        disabled={true}
      />
    </BaseForm>
  );
});

stories.add('Placeholder', () => {
  return (
    <BaseForm>
      <p>
        Note: Placeholders are not always an ideal user experience and can lead
        to confusion.
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
    </BaseForm>
  );
});

stories.add('Initial Value', () => {
  return (
    <BaseForm>
      <FormInput id="initial-text" label="Initial Text" value="My Text" />
      <FormInput
        id="initial-email"
        label="Initial Email"
        type="email"
        value="My Email"
      />
      <FormInput
        id="initial-select"
        label="Initial Select"
        type="select"
        options={SELECT_OPTIONS}
        value="zoidberg"
      />
      <FormInput
        id="initial-textarea"
        label="Initial Textarea"
        type="textarea"
        value="My Textarea"
      />
    </BaseForm>
  );
});

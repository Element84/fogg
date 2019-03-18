import React from 'react';
import { storiesOf } from '@storybook/react';

import FormInput from '../../components/FormInput';

const stories = storiesOf('FormInput', module);

stories.add('Default', () => <FormInput label="Form Input" />);

stories.add('Event Handlers', () => {

  function handleChange(event) {
    console.log('Change!', event.target.value);
  }

  return (
    <FormInput label="Console Log Input" onChange={handleChange} />
  );

});
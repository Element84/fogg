import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from '../../components/Form';

const stories = storiesOf('Form', module);

stories.add('Default', () => <Form>Hi</Form>);

stories.add('Event Handlers', () => {

  function handleSubmit(event) {
    event.persist();
    event.preventDefault();
    console.log('Submit!', event.target.name, Array.from(event.target.elements).map(input => input && input.value));
  }

  function handleChange(event) {
    event.persist();
    console.log('Change!', event.target.name, event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      <input type="text" placeholder="Test input" />
      <button>Submit!</button>
    </Form>
  );

});
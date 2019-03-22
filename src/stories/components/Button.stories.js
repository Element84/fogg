import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../components/Button';

const stories = storiesOf('Components|Button', module);

stories.add('Default', () => {
  return (
    <>
      <p>
        <Button text="Button No Link" />
      </p>
      <p>
        <Button to="/" text="Button With Link" />
      </p>
    </>
  );
});

stories.add('Disabled', () => {
  return (
    <>
      <p>
        <Button text="Button No Link" disabled={true} />
      </p>
      <p>
        <Button to="/" text="Button With Link" disabled={true} />
      </p>
    </>
  );
});

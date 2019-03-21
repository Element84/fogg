import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../components/Button';

storiesOf('Button', module)
  .add('Default', () => {
    return (
      <>
        <p>
          <Button text="Button No Link" invalid={true} />
        </p>
        <p>
          <Button to="/" text="Button With Link" />
        </p>
      </>
    )
  });
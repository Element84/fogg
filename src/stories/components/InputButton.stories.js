import React from 'react';
import { storiesOf } from '@storybook/react';

import InputButton from '../../components/InputButton';

const stories = storiesOf('Components|InputButton', module);

stories.add('Default', () => {
  return (
    <>
      <p>
        <InputButton
          id="inputbutton-checkbox"
          name="inputbutton-checkbox"
          label="InputButton Checkbox"
          type="checkbox"
        />
      </p>
      <ul>
        <li>
          <InputButton
            id="inputbutton-radio-1"
            name="inputbutton-radio"
            label="InputButton Radio 1"
            type="radio"
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-2"
            name="inputbutton-radio"
            label="InputButton Radio 2"
            type="radio"
          />
        </li>
      </ul>
    </>
  );
});

stories.add('Prechecked', () => {
  return (
    <>
      <p>
        <InputButton
          name="inputbutton-checkbox"
          label="InputButton Checkbox"
          type="checkbox"
          isChecked={true}
        />
      </p>
      <ul>
        <li>
          <InputButton
            id="inputbutton-radio-1"
            name="inputbutton-radio"
            label="InputButton Radio 1"
            type="radio"
            isChecked={true}
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-2"
            name="inputbutton-radio"
            label="InputButton Radio 2"
            type="radio"
          />
        </li>
      </ul>
    </>
  );
});

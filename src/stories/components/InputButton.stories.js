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
          value="inputbutton-checkbox"
        />
      </p>
      <ul>
        <li>
          <InputButton
            id="inputbutton-radio-1"
            name="inputbutton-radio"
            label="InputButton Radio 1"
            type="radio"
            value="inputbutton-radio-1"
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-2"
            name="inputbutton-radio"
            label="InputButton Radio 2"
            type="radio"
            value="inputbutton-radio-2"
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
        Why can&apos;t I uncheck you? 🤔
        <InputButton
          name="inputbutton-checkbox"
          label="InputButton Checkbox"
          type="checkbox"
          isChecked={true}
          value="inputbutton-checkbox"
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
            value="inputbutton-radio-1"
          />
        </li>
        <li>
          <InputButton
            id="inputbutton-radio-2"
            name="inputbutton-radio"
            label="InputButton Radio 2"
            type="radio"
            value="inputbutton-radio-2"
          />
        </li>
      </ul>
    </>
  );
});

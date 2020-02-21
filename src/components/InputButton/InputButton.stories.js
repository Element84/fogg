import React from 'react';
import { storiesOf } from '@storybook/react';
import { FaTimes } from 'react-icons/fa';

import InputButton from './';

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
        <li>
          <InputButton
            id="inputbutton-radio-3"
            name="inputbutton-radio"
            label="InputButton Radio 3"
            type="radio"
            value="inputbutton-radio-3"
            icon={<FaTimes />}
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

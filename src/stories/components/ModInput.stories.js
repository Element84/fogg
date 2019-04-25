import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ModInput from '../../components/ModInput';

const stories = storiesOf('Components|ModInput', module);

const defaultValue = 'Chookity';

function handleOnSave (value, name) {
  const hasChanged = value !== defaultValue;
  action('ModInput::onSave')(
    name,
    value,
    `Has changed since load: ${hasChanged}`
  );
}

stories.add('Default', () => (
  <ModInput id="test" defaultValue={defaultValue} onSave={handleOnSave} />
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Story from '../../../../stories/helpers/Story';

import SearchBox from '../';

const STORY_COMPONENT = 'Search Box';
const STORY_NAME = 'Default';

const stories = storiesOf(`Components/${STORY_COMPONENT}`, module);

function handleOnInput ({ target }) {
  action(`${STORY_COMPONENT}::onInput`)(target.value);
}

function handleOnSearch (query, date) {
  action(`${STORY_COMPONENT}::onSearch`)(query, JSON.stringify(date));
}

stories.add('Default', () => {
  return (
    <Story component={STORY_COMPONENT} name={STORY_NAME}>
      <SearchBox onInput={handleOnInput} onSearch={handleOnSearch} />
    </Story>
  );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchBox from '../../components/SearchBox';

const stories = storiesOf('Components|SearchBox', module);

function handleOnInput ({ target }) {
  action('SearchBox::onInput')(target.value);
}

function handleOnSearch (query, date) {
  action('SearchBox::onSearch')(query, JSON.stringify(date));
}

stories.add('Default', () => (
  <SearchBox onInput={handleOnInput} onSearch={handleOnSearch} />
));

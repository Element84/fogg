import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBox from '../../components/SearchBox';

const stories = storiesOf('Components|SearchBox', module);

function handleInput({ target }) {

  console.log('target', target.value);

}

stories.add('Default', () => <SearchBox onInput={handleInput} />);

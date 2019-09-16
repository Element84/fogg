import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchDate from '../../components/SearchDate';

const stories = storiesOf('Components|SearchDate', module);

stories.add('Default', () => <SearchDate />);

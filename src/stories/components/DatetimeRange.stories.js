import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatetimeRange from '../../components/DatetimeRange';

const stories = storiesOf('Components|DatetimeRange', module);

function handleDateChange (date) {
  action('DatetimeRange::onChange')(JSON.stringify(date));
}

stories.add('Default', () => <DatetimeRange onChange={handleDateChange} />);

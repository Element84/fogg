import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import SearchDate from '../../components/SearchDate';

const stories = storiesOf('Components|SearchDate', module);

stories.add('Default', () => {
  const Wrapper = () => {
    const [date, setDate] = useState({
      dateIsOpen: false,
      date: {}
    });

    function handleDateChange (date) {
      setDate(date);
    }

    return <SearchDate defaultDate={date} onChange={handleDateChange} />;
  };

  return <Wrapper />;
});

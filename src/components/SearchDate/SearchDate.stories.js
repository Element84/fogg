import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchDate from './';

const stories = storiesOf('Components|SearchDate', module);

stories.add('Default', () => {
  const Wrapper = () => {
    const [date, setDate] = useState({
      dateIsOpen: false,
      date: {}
    });

    function handleDateChange (newDate) {
      setDate(newDate);
    }

    useEffect(() => {
      action('searchdate-render')(JSON.stringify(date.date));
    }, [date.date]);

    return <SearchDate defaultDate={date} onChange={handleDateChange} />;
  };

  return <Wrapper />;
});

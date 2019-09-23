import React, { useContext } from 'react';
import { LensContext } from '../context';

import SearchDate from './SearchDate';

const LensSearchDate = () => {
  const { lens = {} } = useContext(LensContext) || {};
  const { handlers: lensHandlers = {}, date, mapConfig } = lens;
  const { handleOnSearch, handleDateChange: handleOnChange } = lensHandlers;

  const { center } = mapConfig || {};

  function handleOnDateChange (changedDate = {}) {
    handleOnSearch(center, changedDate);
  }

  return (
    <SearchDate
      onChange={handleOnChange}
      onDateChange={handleOnDateChange}
      onDateClear={handleOnDateChange}
      onDateCancel={handleOnDateChange}
      defaultDate={date}
      classPrefix={'search-box-controls'}
    />
  );
};

export default LensSearchDate;

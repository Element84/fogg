import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LensContext } from '../context';

import SearchDate from './SearchDate';

const LensSearchDate = ({ allowFutureDate }) => {
  const { lens = {} } = useContext(LensContext) || {};
  const { handlers: lensHandlers = {}, date, mapConfig } = lens;
  const { handleOnSearch, handleDateChange: handleOnChange } = lensHandlers;

  const { center } = mapConfig || {};

  function handleOnDateChange (changedDate = {}) {
    handleOnSearch(center, changedDate);
  }

  // Perform the initial search
  useEffect(() => {
    handleOnDateChange(date);
  }, []);

  return (
    <SearchDate
      onChange={handleOnChange}
      onDateChange={handleOnDateChange}
      onDateClear={handleOnDateChange}
      onDateCancel={handleOnDateChange}
      defaultDate={date}
      classPrefix={'search-box-controls'}
      allowFutureDate={allowFutureDate}
    />
  );
};

LensSearchDate.propTypes = {
  allowFutureDate: PropTypes.bool
};

export default LensSearchDate;

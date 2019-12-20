import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import SearchDate from './SearchDate';

const LensSearchDate = ({ allowFutureDate }) => {
  const { geoSearch = {} } = useLens();
  const { updateSearch, queryParams = {} } = geoSearch;
  const { date = {} } = queryParams;

  /**
   * handleOnDateChange
   */

  function handleOnDateChange (changedDate = {}) {
    updateSearch({
      date: changedDate.date
    });
  }

  return (
    <SearchDate
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

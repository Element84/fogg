import React, { useEffect } from 'react';
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
    console.error('changedDate', changedDate)
    updateSearch({
      date: changedDate.date
    })
  }

  /**
   * handleOnChange
   */

  function handleOnChange() {
    console.log('asdfasdf')
    console.error('handleOnChange date arguments', arguments);
  }

  // Perform the initial search
  // useEffect(() => {
  //   handleOnDateChange(date);
  // }, []);

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

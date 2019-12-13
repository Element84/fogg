import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../hooks';

import SearchComplete from './SearchComplete';

const LensSearchComplete = ({ forwardedRef, ...props }) => {
  const { geoSearch = {} } = useLens();
  const { queryParams = {}, search, updateSearch, resolveOnAutocomplete } = geoSearch;
  const { date, textInput } = queryParams;

  /**
   * handleDateChange
   * @description Manages triggering a search based off of date change
   */

  function handleDateChange(dateConfig = {}) {
    updateSearch({
      date: dateConfig.date
    });
  }

  /**
   * handleSearch
   * @description Manages creating a search based off of the search complete's values
   */

  function handleSearch(location, date, textInput) {
    const center = location && {
      lat: location.y,
      lng: location.x
    };
    search({
      textInput,
      center,
      date
    });
  }

  return (
    <SearchComplete
      defaultValue={textInput}
      date={date}
      onSearch={handleSearch}
      resolveQueryComplete={resolveOnAutocomplete}
      forwardedRef={forwardedRef}
      onDateChange={handleDateChange}
      {...props}
    />
  );
};

LensSearchComplete.propTypes = {
  forwardedRef: PropTypes.object
};

const LensSearchCompleteWithRefs = React.forwardRef(function lensMap (
  props,
  ref
) {
  return <LensSearchComplete {...props} forwardedRef={ref} />;
});

LensSearchCompleteWithRefs.displayName = 'LensSearchCompleteWithRefs';

export default LensSearchCompleteWithRefs;

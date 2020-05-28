import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import SearchComplete from '../SearchComplete';

const LensSearchComplete = ({ forwardedRef, ...props }) => {
  const { geoSearch = {} } = useLens();
  const {
    queryParams = {},
    config = {},
    search,
    updateSearch,
    resolveOnAutocomplete
  } = geoSearch;
  const { date, textInput } = queryParams;
  const { utc, ignoreDatetime } = config;

  /**
   * handleDateChange
   * @description Manages triggering a search based off of date change
   */

  function handleDateChange (dateConfig = {}) {
    updateSearch({
      date: dateConfig.date
    });
  }

  /**
   * handleSearch
   * @description Manages creating a search based off of the search complete's values
   */

  function handleSearch ({ location, date, textInput, geoJson } = {}) {
    const hasTextInput = textInput && textInput !== '';

    // If we dont have a location or a text input, we can't actually make a search.
    // So instead, try to find the search input in the DOM and focus on it to
    // prompt the user to enter a query

    if (!location && !hasTextInput) {
      const { current: searchComplete } = forwardedRef;
      const searchInput =
        searchComplete && searchComplete.querySelector('input');

      if (searchInput) {
        searchInput.focus();
      }

      return;
    }

    const center = location && {
      lat: location.y,
      lng: location.x
    };

    search({
      textInput,
      center,
      geoJson,
      date
    });
  }

  return (
    <SearchComplete
      defaultValue={textInput}
      date={date}
      ignoreDatetime={ignoreDatetime}
      onSearch={handleSearch}
      resolveQueryComplete={resolveOnAutocomplete}
      forwardedRef={forwardedRef}
      onDateChange={handleDateChange}
      utc={utc}
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

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import composeRefs from '@seznam/compose-react-refs';

import SearchBox from '../SearchBox';

const MAX_RESULTS = 5;
const QUERY_COMPLETE_DEBOUNCE = 300;

const SearchComplete = ({
  onSearch,
  onDateChange,
  resolveQueryComplete,
  placeholder = 'Search',
  defaultValue = '',
  date,
  utc = false,
  ignoreDatetime = false,
  forwardedRef,
  searchDropOption = false,
  searchDropOptions = [],
  allowStartAfterEndDate,
  allowFutureDate
}) => {
  const [isOpen, updateOpenState] = useState(false);
  const [results, updateResults] = useState([]);
  const [query, updateQuery] = useState('');
  const [searchInput, updateSearchInput] = useState(defaultValue);
  const [debouncedUpdateQueryState] = useDebouncedCallback(
    updateQueryState,
    QUERY_COMPLETE_DEBOUNCE
  );
  const [option, setOptionValue] = useState('default');
  const [options, setOptions] = useState([searchDropOptions]);
  let activeSearchOption = option;
  let activeSearchOptions = options;

  const ref = useRef(null);

  const handleEscapeButton = (event) => {
    if (event.key === 'Escape') {
      updateOpenState(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      updateOpenState(false);
    }
  };
  
  let localSearchDropOptions = [
    {
        label: 'Map Location',
        id: 'search-radio-1',
        onClick: handleOptionClick,
        value: 'default',
        isChecked: true
    },
    {
        label: 'Collect ID',
        id: 'search-radio-2',
        onClick: handleOptionClick,
        value: 'collect-id-007',
        isChecked: false
    },
    {
        label: 'Granule ID',
        id: 'search-radio-3',
        onClick: handleOptionClick,
        value: 'granule-id-007',
        isChecked: false
    }
  ];

  let reducedOptions;

  useEffect(() => {
    if ( options.length === 0 || options[0].length === 0 ) {
      reducedOptions = localSearchDropOptions;
      setOptions(options => [...options, localSearchDropOptions]);
    }
  }, [searchDropOption]);

  function handleOptionClick (e) {

    if (!Array.isArray(options)) {

      activeSearchOptions = options;
      activeSearchOptions.forEach((item) => item.isChecked = 'false');
      let objIndex = activeSearchOptions.findIndex((obj => obj.id == e.target.id));
      activeSearchOptions[objIndex].isChecked = e.target.checked;

      setOptionValue(e.target.value);
      
    } else {
      
      options.forEach(element => activeSearchOptions = element);
      activeSearchOptions.forEach(item => item.isChecked = 'false');
      let objIndex = activeSearchOptions.findIndex((obj => obj.id == e.target.id));
      activeSearchOptions[objIndex].isChecked = e.target.checked;

      setOptionValue(e.target.value);

    }
  }

  activeSearchOptions.forEach(element => reducedOptions = element);

  // When the component renders, update the state with the default values
  // Particularly useful for grabbing query params and prefilling state

  useEffect(() => {
    updateSearchInput(defaultValue);
    document.addEventListener('keydown', handleEscapeButton, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscapeButton, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [defaultValue]);

  /**
   * handleSearchboxSearch
   * @description Triggers when the search box's search button is clicked
   */

  async function handleSearchboxSearch (textInput, searchDate, activeSearchOption = activeSearchOption) {
    setOptionValue(activeSearchOption);

    let autocompleteResults = [];

    if (
      typeof resolveQueryComplete === 'function' &&
      typeof query === 'string'
    ) {
      try {
        autocompleteResults = (await resolveQueryComplete(textInput)) || [];
      } catch (error) {
        throw new Error(`Error fetching autocomplete results: ${error}`);
      }
    }

    const { value } = results[0] || autocompleteResults[0] || {};

    const searchQuery =
      typeof query !== 'string' && textInput === searchInput ? query : value;
    updateQuery(searchQuery);
    handleQuery(searchQuery, searchDate, textInput, null, activeSearchOption);
    updateOpenState(false);
  }

  /**
   * handleResultClick
   * @description Triggers when someone clicks on a result item
   */

  function handleResultClick (e, value, label, geoJson, activeSearchOption = activeSearchOption) {
    updateSearchInput(label);
    handleQuery(value, null, label, geoJson, activeSearchOption);
    updateQuery(value);
    updateOpenState(false);
  }

  /**
   * handleQuery
   * @description Manges making the actual query search
   */

  function handleQuery (
    location,
    searchDate = date,
    textInput = query,
    geoJson,
    activeSearchOption
  ) {
    if (typeof onSearch === 'function') {
      onSearch({
        location,
        geoJson,
        date: searchDate && searchDate.date,
        textInput,
        activeSearchOption
      });
    }
  }

  /**
   * handleOnInput
   * @description Handles onInput for the searchbox
   */

  function handleOnInput (e) {
    e.persist();
    // Use a debounced version of the function that
    // updates the query state and handles the fetching
    // of our autocomplete results to avoid many
    // unneeded calls
    debouncedUpdateQueryState(e);
  }

  /**
   * updateQueryState
   * @description Handles onInput for the searchbox
   */

  function updateQueryState ({ target }) {
    updateQuery(target.value);
    updateSearchInput(target.value);
    handleFetchQueryComplete(target.value);
  }

  /**
   * handleFetchQueryComplete
   * @description Triggers an async function that's passed in from the parent
   *     that works on fetching any autocomplete results
   */

  async function handleFetchQueryComplete (value) {
    let results = [];

    if (typeof resolveQueryComplete === 'function') {
      try {
        results = await resolveQueryComplete(value);
      } catch (error) {
        throw new Error(`Error fetching autocomplete results: ${error}`);
      }
    }

    if (Array.isArray(results)) {
      updateResults(results);

      if (results.length > 0) {
        updateOpenState(true);
      }
    }

    return results;
  }

  return (
    <div
      ref={composeRefs(ref, forwardedRef)}
      className="search-complete"
      data-is-search-complete-open={isOpen && results.length > 0}
    >
      <SearchBox
        onSearch={handleSearchboxSearch}
        onInput={handleOnInput}
        placeholder={placeholder}
        searchInput={searchInput}
        date={date}
        utc={utc}
        ignoreDatetime={ignoreDatetime}
        onDateChange={onDateChange}
        searchDropOption={searchDropOption}
        searchDropOptions={reducedOptions}
        allowStartAfterEndDate={allowStartAfterEndDate}
        allowFutureDate={allowFutureDate}
      />

      <div
        className={`search-complete-results ${isOpen ? 'active' : 'inactive'}`}
      >
        <ul>
          {results
            .slice(0, MAX_RESULTS)
            .map(({ label, sublabel, value, geoJson } = {}, index) => {
              return (
                <li
                  key={`SearchComplete-Result-Item-${index}`}
                  className="search-complete-results-item"
                >
                  <button
                    onClick={(e) => handleResultClick(e, value, label, geoJson)}
                  >
                    <span className="search-complete-results-item-label">
                      {label}
                    </span>
                    {sublabel && (
                      <span className="search-complete-results-item-sublabel">
                        {sublabel}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

SearchComplete.propTypes = {
  onSearch: PropTypes.func,
  onDateChange: PropTypes.func,
  resolveQueryComplete: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  clearSearchInput: PropTypes.bool,
  date: PropTypes.object,
  utc: PropTypes.bool,
  ignoreDatetime: PropTypes.bool,
  forwardedRef: PropTypes.object,
  searchDropOption: PropTypes.bool,
  searchDropOptions: PropTypes.array
};

export default SearchComplete;

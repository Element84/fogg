import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

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
  forwardedRef
}) => {
  const [isOpen, updateOpenState] = useState(false);
  const [results, updateResults] = useState([]);
  const [query, updateQuery] = useState('');
  const [searchInput, updateSearchInput] = useState(defaultValue);
  const [debouncedUpdateQueryState] = useDebouncedCallback(
    updateQueryState,
    QUERY_COMPLETE_DEBOUNCE
  );

  // When the component renders, update the state with the default values
  // Particularly useful for grabbing query params and prefilling state

  useEffect(() => {
    updateSearchInput(defaultValue);
  }, [defaultValue]);

  /**
   * handleSearchboxSearch
   * @description Triggers when the search box's search button is clicked
   */

  async function handleSearchboxSearch (textInput, searchDate) {
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
    handleQuery(searchQuery, searchDate, textInput);
    updateOpenState(false);
  }

  /**
   * handleResultClick
   * @description Triggers when someone clicks on a result item
   */

  function handleResultClick (e, value, label) {
    updateSearchInput(label);
    handleQuery(value, null, label);
    updateQuery(value);
    updateOpenState(false);
  }

  /**
   * handleQuery
   * @description Manges making the actual query search
   */

  function handleQuery (query, searchDate = date, textInput = query) {
    if (typeof onSearch === 'function') {
      onSearch(query, searchDate && searchDate.date, textInput);
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
      ref={forwardedRef}
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
        onDateChange={onDateChange}
      />

      <div className="search-complete-results">
        <ul>
          {results
            .slice(0, MAX_RESULTS)
            .map(({ label, sublabel, value } = {}, index) => {
              return (
                <li
                  key={`SearchComplete-Result-Item-${index}`}
                  className="search-complete-results-item"
                >
                  <button onClick={(e) => handleResultClick(e, value, label)}>
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
  forwardedRef: PropTypes.object
};

export default SearchComplete;

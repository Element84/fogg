import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDebouncedCallback from 'use-debounce/lib/callback';

import SearchBox from './SearchBox';

const MAX_RESULTS = 5;
const QUERY_COMPLETE_DEBOUNCE = 300;

const SearchComplete = ({
  onSearch,
  resolveQueryComplete,
  placeholder = 'Search',
  defaultValue
}) => {
  const [isOpen, updateOpenState] = useState(false);
  const [results, updateResults] = useState([]);
  const [date, updateDate] = useState({});
  const [query, updateQuery] = useState('');
  const [searchInput, updateSearchInput] = useState('');
  const [debouncedUpdateQueryState] = useDebouncedCallback(
    updateQueryState,
    QUERY_COMPLETE_DEBOUNCE
  );

  /**
   * handleSearchboxSearch
   * @description Triggers when the search box's search button is clicked
   */

  function handleSearchboxSearch (textInput, searchDate) {
    const { value } = results[0] || {};
    let searchQuery =
      typeof query !== 'string' && textInput === searchInput ? query : value;

    updateDate(searchDate);
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

  function handleQuery (query, searchDate, textInput) {
    if (typeof onSearch === 'function') {
      onSearch(query, searchDate || date, textInput || query);
    }
  }

  /**
   * handleOnInput
   * @description Handles onInput for the searchbox
   */

  function handleOnInput (e, searchDate) {
    e.persist();
    // Use a debounced version of the function that
    // updates the query state and handles the fetching
    // of our autocomplete results to avoid many
    // unneeded calls
    debouncedUpdateQueryState(e, searchDate);
  }

  /**
   * updateQueryState
   * @description Handles onInput for the searchbox
   */

  function updateQueryState ({ target }, searchDate) {
    updateDate(searchDate);
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
  }

  return (
    <div
      className="search-complete"
      data-is-search-complete-open={isOpen && results.length > 0}
    >
      <SearchBox
        onSearch={handleSearchboxSearch}
        onInput={handleOnInput}
        placeholder={placeholder}
        searchInput={searchInput || defaultValue}
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
                  <button onClick={e => handleResultClick(e, value, label)}>
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
  resolveQueryComplete: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
};

export default SearchComplete;

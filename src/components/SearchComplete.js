import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useDebouncedCallback from 'use-debounce/lib/callback';

import SearchBox from './SearchBox';

const MAX_RESULTS = 5;
const QUERY_COMPLETE_DEBOUNCE = 300;

const SearchComplete = ({ onSearch, resolveQueryComplete }) => {
  const [isOpen, updateOpenState] = useState(false);
  const [results, updateResults] = useState([]);
  const [date, updateDate] = useState({});
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
    updateDate(searchDate);
    handleQuery(value, searchDate);
    updateOpenState(false);
  }

  /**
   * handleResultClick
   * @description Triggers when someone clicks on a result item
   */

  function handleResultClick (e, value) {
    handleQuery(value);
    updateOpenState(false);
  }

  /**
   * handleQuery
   * @description Manges making the actual query search
   */

  function handleQuery (query, searchDate) {
    if (typeof onSearch === 'function') {
      onSearch(query, searchDate || date);
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
      <SearchBox onSearch={handleSearchboxSearch} onInput={handleOnInput} />

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
                  <button onClick={e => handleResultClick(e, value)}>
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
  resolveQueryComplete: PropTypes.func
};

export default SearchComplete;

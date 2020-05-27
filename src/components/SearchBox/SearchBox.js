import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import { useStoredValue } from '../../hooks';

import Form from '../Form';
import FormInput from '../FormInput';
import Button from '../Button';
import SearchDate from '../SearchDate';

const SearchBox = ({
  onInput,
  onSearch,
  placeholder = 'Search',
  searchInput = '',
  date = {},
  utc = false,
  ignoreDatetime = false,
  onDateChange
}) => {
  const { value: query, updateValue: setQuery } = useStoredValue(searchInput);
  const [dateIsOpen, setDateIsOpen] = useState(false);

  /**
   * handleSearchInput
   * @description Fires onInput of search field and fires onInput if available
   */

  function handleSearchInput (e = {}) {
    const { target } = e;
    setQuery(target.value);
    if (typeof onInput === 'function') {
      onInput(e, date);
    }
  }

  /**
   * handleSearchClick
   * @description Fires when the search button is clicked
   */

  function handleSearchClick (e) {
    handleSearch(query);
    setDateIsOpen(false);
  }

  /**
   * handleSearch
   * @description Handles performing search and firing onSearch callback with query
   */

  function handleSearch (searchQuery = query, searchDate = date) {
    if (typeof onSearch === 'function') {
      onSearch(searchQuery, searchDate);
    }
  }

  /**
   * handleChange
   * @description Fires on date change
   */

  function handleChange (newDate = {}) {
    if (typeof onDateChange === 'function') {
      onDateChange(newDate);
    }
  }

  /**
   * handleDateSearch
   * @description Fires search on date change
   */

  function handleDateSearch (newDate = {}) {
    if (isDateRangeEqual(date.date, newDate.date)) return;

    if (typeof query === 'string' && query.length > 0) {
      handleSearch(query, newDate);
    }
  }

  /**
   * handleFormSubmit
   * @description
   */

  function handleFormSubmit () {
    handleSearchClick();
    return false;
  }

  return (
    <div className="search-box">
      <Form onSubmit={handleFormSubmit} autoComplete="off">
        <FormInput
          id="search-box-input"
          className="search-box-input"
          placeholder={placeholder}
          onInput={handleSearchInput}
          value={query}
        />
      </Form>
      <div className="search-box-controls">
        {!ignoreDatetime && (
          <SearchDate
            onChange={handleChange}
            onDateChange={handleDateSearch}
            onDateClear={handleDateSearch}
            defaultIsOpen={dateIsOpen}
            defaultDate={date}
            utc={utc}
            classPrefix={'search-box-controls'}
          />
        )}
        <div className="search-box-controls-search">
          <Button
            className="search-box-controls-control"
            onClick={handleSearchClick}
          >
            <FaSearch />
          </Button>
        </div>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onInput: PropTypes.func,
  onSearch: PropTypes.func,
  onDateChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchInput: PropTypes.string,
  date: PropTypes.object,
  utc: PropTypes.bool,
  ignoreDatetime: PropTypes.bool
};

export default SearchBox;

function isDateRangeEqual (one = {}, two = {}) {
  const keys = ['start', 'end'];
  let isEqual = true;

  keys.forEach(key => {
    if (one[key] !== two[key]) {
      isEqual = false;
    }
  });

  return isEqual;
}

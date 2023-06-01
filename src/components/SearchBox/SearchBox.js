import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

import { useStoredValue } from '../../hooks';

import Form from '../Form';
import FormInput from '../FormInput';
import Button from '../Button';
import SearchDate from '../SearchDate';
import SearchDropOptions from '../SearchDropOptions';

const SearchBox = ({
  onInput,
  onSearch,
  placeholder = 'Search',
  searchInput = '',
  date = {},
  utc = false,
  searchDropOption = false,
  searchDropOptions = [],
  ignoreDatetime = false,
  onDateChange,
  allowStartAfterEndDate,
  allowFutureDate
}) => {
  const { value: query, updateValue: setQuery } = useStoredValue(searchInput);
  const [dateIsOpen, setDateIsOpen] = useState(false);
  const [option, setOptions] = useState(searchDropOptions);

  let activeOptionVal;
  if (Array.isArray(option) && option.length !== 0) {
    const activeOption = option.findIndex(obj => obj.isChecked === true);
    activeOptionVal = option[activeOption].value;
  }

  const [optionValue, setOptionValue] = useState(activeOptionVal);

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

  function handleSearch (searchQuery = query, searchDate = date, searchOption = optionValue) {
    if (typeof onSearch === 'function') {
      onSearch(searchQuery, searchDate, searchOption);
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

  function handleOptionClick (e) {
    activeOptionVal = e.target.value;

    // Reset and re-assign the active one.
    searchDropOptions.forEach((item) => item.isChecked === 'false');
    const objIndex = searchDropOptions.findIndex(obj => obj.id === e.target.id);
    searchDropOptions[objIndex].isChecked = e.target.checked;

    setOptions(option => [...option, searchDropOptions]);
    setOptionValue(e.target.value);
  }

  return (
    <div className="search-box">
      <Form onSubmit={handleFormSubmit} autoComplete="off">
        {searchDropOption && (
          <SearchDropOptions
            options={searchDropOptions}
            onOptionClick={handleOptionClick}
          />
        )}
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
            allowStartAfterEndDate={allowStartAfterEndDate}
            allowFutureDate={allowFutureDate}
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
  searchDropOption: PropTypes.bool,
  searchDropOptions: PropTypes.array,
  ignoreDatetime: PropTypes.bool,
  allowFutureDate: PropTypes.bool,
  allowStartAfterEndDate: PropTypes.bool
};

export default SearchBox;

function isDateRangeEqual (one = {}, two = {}) {
  const keys = ['start', 'end'];
  let isEqual = true;

  keys.forEach((key) => {
    if (one[key] !== two[key]) {
      isEqual = false;
    }
  });

  return isEqual;
}

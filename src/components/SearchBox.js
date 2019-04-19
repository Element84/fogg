import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

import FormInput from './FormInput';
import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchBox = ({ onInput, onSearch }) => {
  const [query, setQuery] = useState('');

  const [date, setDate] = useState({
    isOpen: false,
    date: {}
  });

  /**
   * handleSearchInput
   * @description Fires onInput of search field and fires onInput if available
   */

  function handleSearchInput (e) {
    const { target } = e;
    setQuery(target.value);
    if (typeof onInput === 'function') {
      onInput(e, date.date);
    }
  }

  /**
   * handleSearchClick
   * @description Fires when the search button is clicked
   */

  function handleSearchClick (e) {
    handleSearch(query);
  }

  /**
   * handleSearch
   * @description Handles performing search and firing onSearch callback with query
   */

  function handleSearch (query) {
    if (typeof onSearch === 'function') {
      onSearch(query, date.date);
    }
  }

  /**
   * handleDateClick
   * @description Fires when the date button is clicked
   */

  function handleDateClick () {
    setDate({
      ...date,
      isOpen: !date.isOpen
    });
  }

  /**
   * handleDateChange
   * @description Fires when the datetime range changes
   */

  function handleDateChange (newDate = {}) {
    setDate({
      ...date,
      date: {
        ...newDate
      }
    });
  }

  return (
    <div
      className="search-box"
      data-has-active-date-range={
        date.date && !!(date.date.start || date.date.end)
      }
    >
      <FormInput
        className="search-box-input"
        placeholder="Search"
        onInput={handleSearchInput}
      />
      <div className="search-box-controls">
        <div
          className="search-box-controls-date"
          data-is-searchbox-open={date.isOpen}
        >
          <Button onClick={handleDateClick}>
            <FaCalendarAlt />
          </Button>
          <div className="search-box-controls-date-picker">
            <DatetimeRange onChange={handleDateChange} />
          </div>
        </div>
        <div className="search-box-controls-search">
          <Button onClick={handleSearchClick}>
            <FaSearch />
          </Button>
        </div>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  onInput: PropTypes.func,
  onSearch: PropTypes.func
};

export default SearchBox;

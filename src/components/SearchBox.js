import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

import Form from './Form';
import FormInput from './FormInput';
import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchBox = ({
  onInput,
  onSearch,
  placeholder = 'Search',
  searchInput = ''
}) => {
  const [query, setQuery] = useState('');

  const [date, setDate] = useState({
    dateIsOpen: false,
    date: {}
  });

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  /**
   * handleSearchInput
   * @description Fires onInput of search field and fires onInput if available
   */

  function handleSearchInput (e = {}) {
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
    setDate({
      ...date,
      dateIsOpen: false
    });
  }

  /**
   * handleSearch
   * @description Handles performing search and firing onSearch callback with query
   */

  function handleSearch (searchQuery = query, searchDate = date.date) {
    if (typeof onSearch === 'function') {
      onSearch(searchQuery, searchDate);
    }
  }

  /**
   * handleDateClick
   * @description Fires when the date button is clicked
   */

  function handleDateClick () {
    setDate({
      ...date,
      dateIsOpen: !date.dateIsOpen
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
      },
      dateIsOpen: false
    });
    if (typeof query === 'string' && query.length > 0) {
      handleSearch(query, newDate);
    }
  }

  /**
   * handleDateCancel
   * @description Fires when the datetime range changes are cancelled
   */

  function handleDateCancel () {
    setDate({
      ...date,
      dateIsOpen: false
    });
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
    <div
      className="search-box"
      data-has-active-date-range={
        date.date && !!(date.date.start || date.date.end)
      }
    >
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
        <div
          className="search-box-controls-date"
          data-is-searchbox-date-open={date.dateIsOpen}
        >
          <Button
            className="search-box-controls-control"
            onClick={handleDateClick}
          >
            <FaCalendarAlt />
          </Button>
          <div className="search-box-controls-date-picker">
            <DatetimeRange
              onChange={handleDateChange}
              onCancel={handleDateCancel}
            />
          </div>
        </div>
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
  placeholder: PropTypes.string,
  searchInput: PropTypes.string
};

export default SearchBox;

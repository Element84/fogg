import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

import Form from './Form';
import FormInput from './FormInput';
import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchBox = ({ onInput, onSearch }) => {
  const [query, setQuery] = useState('');

  const [date, setDate] = useState({
    dateIsOpen: false,
    date: {}
  });

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

  function handleSearch () {
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
      }
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
      <Form onSubmit={handleFormSubmit}>
        <FormInput
          className="search-box-input"
          placeholder="Search"
          onInput={handleSearchInput}
        />
      </Form>
      <div className="search-box-controls">
        <div
          className="search-box-controls-date"
          data-is-searchbox-date-open={date.dateIsOpen}
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

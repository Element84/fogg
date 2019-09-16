import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt } from 'react-icons/fa';

import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchDate = ({
  onSearch,
  dateIsOpen,
  classPrefix,
  defaultDate = {}
}) => {
  const [clearDate, setClearDate] = useState(false);
  const [date, setDate] = useState({
    dateIsOpen: false,
    date: {}
  });

  useEffect(() => {
    if (!defaultDate.start && !defaultDate.end) {
      setClearDate(true);
    } else {
      setClearDate(false);
    }
  }, [defaultDate]);

  useEffect(() => {
    setDate({
      ...date,
      dateIsOpen
    });
  }, [dateIsOpen]);

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
    handleSearch(newDate);
  }

  /**
   * handleDateClear
   * @description Fires when the datetime is cleared
   */

  function handleDateClear () {
    const clearDate = {
      start: '',
      end: ''
    };
    setDate({
      date: clearDate,
      dateIsOpen: false
    });

    handleSearch(clearDate);
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
   * handleSearch
   * @description Handles performing search and firing onSearch callback with query
   */

  function handleSearch (searchDate = date) {
    if (typeof onSearch === 'function') {
      onSearch(searchDate);
    }
  }

  function appendClassPrefix (suffix) {
    const defaultClass = `search-date-${suffix}`;
    return classPrefix
      ? `${classPrefix}-${suffix} ${defaultClass}`
      : `${defaultClass}`;
  }

  return (
    <div
      className="search-date"
      data-has-active-date-range={
        date.date && !!(date.date.start || date.date.end)
      }
    >
      <div
        className={appendClassPrefix('date')}
        data-is-search-date-open={date.dateIsOpen}
      >
        <Button
          className={appendClassPrefix('control')}
          onClick={handleDateClick}
        >
          <FaCalendarAlt />
        </Button>
        <div className={appendClassPrefix('date-picker')}>
          <DatetimeRange
            onChange={handleDateChange}
            onCancel={handleDateCancel}
            onClear={handleDateClear}
            clearDate={clearDate}
          />
        </div>
      </div>
    </div>
  );
};

SearchDate.propTypes = {
  onInput: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  searchInput: PropTypes.string,
  defaultDate: PropTypes.object,
  dateIsOpen: PropTypes.bool,
  classPrefix: PropTypes.string
};

export default SearchDate;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt } from 'react-icons/fa';

import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchDate = ({
  dateIsOpen,
  onChange,
  onDateClear,
  onDateCancel,
  onDateChange,
  classPrefix,
  defaultDate = {}
}) => {
  const [date, setDate] = useState({
    ...defaultDate,
    dateIsOpen: false
  });

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
    const newDate = {
      ...date,
      dateIsOpen: !date.dateIsOpen
    };
    setDate(newDate);
    handleOnChange(newDate);
  }

  /**
   * handleDateChange
   * @description Fires when the datetime range changes
   */

  function handleDateChange (changedDate = {}) {
    const newDate = {
      ...date,
      date: {
        ...changedDate
      },
      dateIsOpen: false
    };
    setDate(newDate);
    handleOnChange(newDate);
    if (typeof onDateChange === 'function') {
      onDateChange(newDate);
    }
  }

  /**
   * handleDateClear
   * @description Fires when the datetime is cleared
   */

  function handleDateClear () {
    const clearedDate = {
      date: {
        start: '',
        end: ''
      },
      dateIsOpen: false
    };
    setDate(clearedDate);
    handleOnChange(clearedDate);
    if (typeof onDateClear === 'function') {
      onDateClear(clearedDate);
    }
  }

  /**
   * handleDateCancel
   * @description Fires when the datetime range changes are cancelled
   */

  function handleDateCancel () {
    const cancelDate = {
      ...date,
      dateIsOpen: false
    };
    setDate(cancelDate);
    handleOnChange(cancelDate);
    if (typeof onDateCancel === 'function') {
      onDateCancel(cancelDate);
    }
  }

  /**
   * handleDateChange
   * @description Handles changing the date
   */

  function handleOnChange (changedDate = date) {
    if (typeof onChange === 'function') {
      onChange(changedDate);
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
            clearDate={!defaultDate.date}
          />
        </div>
      </div>
    </div>
  );
};

SearchDate.propTypes = {
  onInput: PropTypes.func,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onDateCancel: PropTypes.func,
  onDateChange: PropTypes.func,
  onDateClear: PropTypes.func,
  placeholder: PropTypes.string,
  searchInput: PropTypes.string,
  defaultDate: PropTypes.object,
  dateIsOpen: PropTypes.bool,
  classPrefix: PropTypes.string
};

export default SearchDate;

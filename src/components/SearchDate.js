import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt } from 'react-icons/fa';

import Button from './Button';
import DatetimeRange from './DatetimeRange';

const SearchDate = ({
  dateIsOpen,
  onOpen,
  onClose,
  onChange,
  onDateClear,
  onDateCancel,
  onDateChange,
  classPrefix,
  defaultDate = {},
  allowFutureDate
}) => {
  const [date, setDate] = useState({
    ...defaultDate,
    dateIsOpen: false
  });

  useEffect(() => {
    setDate({
      ...date,
      dateIsOpen: !!dateIsOpen
    });
  }, [dateIsOpen]);

  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);

  /**
   * handleDateClick
   * @description Fires when the date button is clicked
   */

  function handleDateClick () {
    console.group('>>>> searchDate - handleDateClick')
    console.groupEnd('>>>> searchDate - handleDateClick')
    const state = {
      ...date,
      dateIsOpen: !date.dateIsOpen
    };

    if (date.dateIsOpen ) {
      handleDateCancel();
      handleOnClose(state);
    } else {
      handleOnOpen(state);
    }

    setDate(state);
  }

  /**
   * handleDateChange
   * @description Fires when the datetime range changes
   */

  function handleDateChange (changedDate = {}) {
    console.group('>>>> searchDate - handleDateChange')
    console.log('changedDate', changedDate);
    console.groupEnd('>>>> searchDate - handleDateChange')
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
    console.group('>>>> searchDate - handleDateClear')
    console.groupEnd('>>>> searchDate - handleDateClear')
    const clearedDate = {
      date: {},
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
    console.group('>>>> searchDate - handleDateCancel')
    console.groupEnd('>>>> searchDate - handleDateCancel')
    const state = {
      ...date,
      dateIsOpen: false
    };
    setDate(state);
    if (typeof onDateCancel === 'function') {
      onDateCancel(state);
    }
  }

  /**
   * handleDateChange
   * @description Handles changing the date
   */

  function handleOnChange (changedDate = date) {
    console.group('>>>> searchDate - handleOnChange')
    console.log('typeof onChange', typeof onChange)
    console.groupEnd('>>>> searchDate - handleOnChange')
    if (typeof onChange === 'function') {
      onChange(changedDate);
    }
  }

  /**
   * handleOnOpen
   * @description
   */

  function handleOnOpen() {
    if ( typeof onOpen === 'function' ) {
      onOpen();
    }
  }

  /**
   * handleOnClose
   * @description
   */

  function handleOnClose() {
    if ( typeof onClose === 'function' ) {
      onClose();
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
            defaultDate={defaultDate.date}
            allowFutureDate={allowFutureDate}
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
  classPrefix: PropTypes.string,
  allowFutureDate: PropTypes.bool
};

export default SearchDate;

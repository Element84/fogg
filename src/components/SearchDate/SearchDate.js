import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaCalendarAlt } from 'react-icons/fa';

import Button from '../Button';
import DatetimeRange from '../DatetimeRange';

const SearchDate = ({
  classPrefix,
  onOpen,
  onClose,
  onChange,
  onDateClear,
  onDateCancel,
  onDateChange,
  defaultIsOpen = false,
  defaultDate = {},
  allowFutureDate
}) => {
  const [state, updateState] = useState({
    date: defaultDate,
    isOpen: defaultIsOpen
  });
  const { isOpen, date } = state;

  useEffect(() => {
    updateState({
      ...state,
      isOpen: defaultIsOpen
    });
  }, [defaultIsOpen]);

  useEffect(() => {
    updateState({
      ...state,
      date: defaultDate
    });
  }, [defaultDate]);

  /**
   * handleDateClick
   * @description Fires when the date button is clicked
   */

  function handleDateClick () {
    const newState = {
      ...state,
      isOpen: !isOpen
    };

    if (isOpen) {
      handleDateCancel();
      handleOnClose(newState);
    } else {
      handleOnOpen(newState);
    }

    updateState(newState);
  }

  /**
   * handleDateChange
   * @description Fires when the datetime range changes
   */

  function handleDateChange (changedDate = {}) {
    const newState = {
      ...state,
      date: {
        ...changedDate
      },
      isOpen: false
    };
    updateState(newState);
    handleOnChange(newState);
    if (typeof onDateChange === 'function') {
      onDateChange(newState);
    }
  }

  /**
   * handleDateClear
   * @description Fires when the datetime is cleared
   */

  function handleDateClear () {
    const newState = {
      date: {},
      isOpen: false
    };

    updateState(newState);
    handleOnChange(newState);

    if (typeof onDateClear === 'function') {
      onDateClear(newState);
    }
  }

  /**
   * handleDateCancel
   * @description Fires when the datetime range changes are cancelled
   */

  function handleDateCancel () {
    const newState = {
      ...state,
      isOpen: false
    };

    updateState(newState);

    if (typeof onDateCancel === 'function') {
      onDateCancel(newState);
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

  /**
   * handleOnOpen
   * @description
   */

  function handleOnOpen () {
    if (typeof onOpen === 'function') {
      onOpen();
    }
  }

  /**
   * handleOnClose
   * @description
   */

  function handleOnClose () {
    if (typeof onClose === 'function') {
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
      data-has-active-date-range={date && !!(date.start || date.end)}
    >
      <div
        className={appendClassPrefix('date')}
        data-is-search-date-open={isOpen}
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
            defaultDate={defaultDate}
            allowFutureDate={allowFutureDate}
          />
        </div>
      </div>
    </div>
  );
};

SearchDate.propTypes = {
  classPrefix: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onDateClear: PropTypes.func,
  onDateCancel: PropTypes.func,
  onDateChange: PropTypes.func,
  defaultDate: PropTypes.object,
  defaultIsOpen: PropTypes.bool,
  allowFutureDate: PropTypes.bool
};

export default SearchDate;

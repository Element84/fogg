import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { FaCheck, FaTimes, FaBan } from 'react-icons/fa';

import Button from './Button';

const emptyDate = {
  start: null,
  end: null
};

const DatetimeRange = ({
  onChange,
  onCancel,
  onClear,
  defaultDate,
  allowPastDate = true,
  allowFutureDate = true
}) => {
  const [dateTemp, updateDateTemp] = useState({ ...emptyDate, ...defaultDate });
  const [date, updateDate] = useState(dateTemp);

  // If our defaultDate changes, that most likely means we're using the component
  // in a controlled state, so we want to sync the local state

  useEffect(() => {
    const updatedDate = {
      ...emptyDate,
      ...defaultDate
    }
    updateDateTemp(updatedDate);
    updateDate(updatedDate)
  }, [defaultDate, emptyDate])

  /**
   * isValidDate
   * @description Returns true if valid date and false if not
   */

  function isValidDate (currentDate) {
    if (allowPastDate && allowFutureDate) return true;
    const yesterday = Datetime.moment().subtract(1, 'day');
    const today = Datetime.moment();
    const dateIsAfterYesterday = currentDate.isAfter(yesterday);
    const dateIsBeforeToday = currentDate.isBefore(today);
    if (!allowPastDate) {
      return dateIsAfterYesterday;
    }
    if (!allowFutureDate) {
      return dateIsBeforeToday;
    }
  }

  /**
   * handleUpdateTempDate
   * @description Updates state and triggers on change event if available with new date
   */

  function handleUpdateTempDate (newDate) {
    const updatedDate = {
      ...date, // First spit out any values we have for the saved date
      ...dateTemp, // Then anything we have in our temp stored state date
      ...newDate // Then overlay any of our new values
    };
    updateDateTemp(updatedDate);
  }

  /**
   * handleStartChange
   * @description Fires when the start date changes
   */

  function handleStartChange (moment) {
    const date = moment.format('x');
    handleUpdateTempDate({
      start: parseInt(date)
    });
  }

  /**
   * handleEndChange
   * @description Fires when the end date changes
   */

  function handleEndChange (moment) {
    const date = moment.format('x');
    handleUpdateTempDate({
      end: parseInt(date)
    });
  }

  /**
   * handleDatetimeSave
   * @description When someone clicks the Save button
   */

  function handleDatetimeSave () {
    updateDate(dateTemp);
    if (typeof onChange === 'function') {
      onChange(dateTemp);
    }
  }

  /**
   * handleDatetimeCancel
   * @description When someone clicks the Cancel button
   */

  function handleDatetimeCancel () {
    updateDateTemp(date);
    if (typeof onCancel === 'function') {
      onCancel(date);
    }
  }

  /**
   * handleDatetimeClear
   * @description When someone clicks the Cancel button
   */

  function handleDatetimeClear () {
    updateDateTemp(emptyDate);
    updateDate(emptyDate);
    if (typeof onClear === 'function') {
      onClear(date);
    }
  }

  const datetimeActions = [
    {
      label: 'Save',
      id: 'save',
      onClick: handleDatetimeSave,
      icon: <FaCheck />
    },
    {
      label: 'Cancel',
      id: 'cancel',
      onClick: handleDatetimeCancel,
      icon: <FaTimes />
    },
    {
      label: 'Clear',
      id: 'clear',
      onClick: handleDatetimeClear,
      icon: <FaBan />
    }
  ];

  return (
    <div className="datetime-range">
      <div className="datetime-range-selection">
        <strong>Start Date</strong>
        <Datetime
          input={false}
          onChange={handleStartChange}
          value={dateTemp.start}
          isValidDate={isValidDate}
        />
      </div>
      <div className="datetime-range-selection">
        <strong>End Date</strong>
        <Datetime
          input={false}
          onChange={handleEndChange}
          value={dateTemp.end}
          isValidDate={isValidDate}
        />
      </div>
      <div className="datetime-range-actions">
        <ul>
          {datetimeActions.map(({ label, icon, onClick, id }, index) => {
            const key = `DatetimeRange-Action-${index}-${id}`;
            const className = `datetime-range-actions-${id}`;
            return (
              <li key={key} className={className}>
                <Button type="text" onClick={onClick}>
                  {icon}
                  <span>{label}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

DatetimeRange.propTypes = {
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onClear: PropTypes.func,
  defaultDate: PropTypes.object,
  allowPastDate: PropTypes.bool,
  allowFutureDate: PropTypes.bool
};

export default DatetimeRange;

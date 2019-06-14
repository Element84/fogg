import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { FaCheck, FaTimes } from 'react-icons/fa';

import Button from './Button';

const DatetimeRange = ({ onChange, onCancel }) => {
  const [dateTemp, updateDateTemp] = useState({
    start: null,
    end: null
  });

  const [date, updateDate] = useState({
    start: null,
    end: null
  });

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
    updateDateTemp({
      ...date
    });
    if (typeof onCancel === 'function') {
      onCancel(date);
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
        />
      </div>
      <div className="datetime-range-selection">
        <strong>End Date</strong>
        <Datetime
          input={false}
          onChange={handleEndChange}
          value={dateTemp.end}
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
  onCancel: PropTypes.func
};

export default DatetimeRange;

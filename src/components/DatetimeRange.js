import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';

const DatetimeRange = ({ onChange }) => {
  const [date, updateDate] = useState({
    start: null,
    end: null
  });

  /**
   * handleUpdateDate
   * @description Updates state and triggers on change event if available with new date
   */

  function handleUpdateDate (newDate) {
    const updatedDate = {
      ...date,
      ...newDate
    };

    updateDate(updatedDate);

    if (typeof onChange === 'function') {
      onChange(updatedDate);
    }
  }

  /**
   * handleStartChange
   * @description Fires when the start date changes
   */

  function handleStartChange (moment) {
    handleUpdateDate({
      start: moment.format('x')
    });
  }

  /**
   * handleEndChange
   * @description Fires when the end date changes
   */

  function handleEndChange (moment) {
    handleUpdateDate({
      end: moment.format('x')
    });
  }

  return (
    <div className="datetime-range">
      <div className="datetime-range-selection">
        <strong>Start Date</strong>
        <Datetime input={false} onChange={handleStartChange} />
      </div>
      <div className="datetime-range-selection">
        <strong>End Date</strong>
        <Datetime input={false} onChange={handleEndChange} />
      </div>
    </div>
  );
};

DatetimeRange.propTypes = {
  onChange: PropTypes.func
};

export default DatetimeRange;

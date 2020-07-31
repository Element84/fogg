import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { FaCalendarAlt } from 'react-icons/fa';

import { useInput } from '../../hooks';

import Input from '../Input';

const Datetime = ({
  className,
  props = {},
  onChange,
  onInput,
  allowPastDate = true,
  allowFutureDate = true,
  utc = false,
  disableFrom
}) => {
  const [defaultDate, setDefaultDate] = useState(props.value || '');

  useEffect(() => {
    setDefaultDate(props.value);
  }, [props.value]);

  const { name } = useInput({ props });

  function handleChange (moment) {
    const value = moment && moment.format('x');

    const virtualEvent = {
      target: {
        name,
        value
      }
    };

    if (typeof onChange === 'function') {
      onChange(virtualEvent);
    }

    // React Datetime doesn't support onInput so we need
    // to additionally pass this in to support the way we
    // validate and manage form data

    if (typeof onInput === 'function') {
      onInput(virtualEvent);
    }
  }

  /**
   * isValidDate
   * @description Returns true if valid date and false if not
   */

  function isValidDate (currentDate) {
    // disable 'x' amount of days into the future (from an optional start day)
    if (disableFrom) {
      // disableFrom.from is a moment
      // All moments are mutable. Clone it so that the future day stays consistent with the from date
      const from = disableFrom.from ? disableFrom.from.clone() : {};
      // Find a future day from either the current day, or from an optionally provided start day
      const futureDay = disableFrom.from
        ? from.add(disableFrom.days, 'day')
        : ReactDatetime.moment().add(disableFrom.days, 'day');
      return currentDate.isAfter(futureDay);
    }
    if (allowPastDate && allowFutureDate) return true;
    const yesterday = ReactDatetime.moment().subtract(1, 'day');
    const today = ReactDatetime.moment();
    const dateIsAfterYesterday = currentDate.isAfter(yesterday);
    const dateIsBeforeToday = currentDate.isBefore(today);
    if (!allowPastDate) {
      return dateIsAfterYesterday;
    }
    if (!allowFutureDate) {
      return dateIsBeforeToday;
    }
  }

  function renderInput (defaultProps) {
    const allProps = {
      value: defaultProps.value,
      onChange: defaultProps.onChange,
      onInput: defaultProps.onInput,
      onKeyDown: defaultProps.onKeydown,
      onFocus: defaultProps.onFocus
    };

    return (
      <>
        <FaCalendarAlt {...defaultProps} {...allProps} />
        <Input
          className={`datetime ${className}`}
          props={{
            ...props,
            autoComplete: 'off'
          }}
          {...allProps}
        />
      </>
    );
  }

  return (
    <ReactDatetime
      renderInput={renderInput}
      onChange={handleChange}
      defaultValue={defaultDate}
      isValidDate={isValidDate}
      utc={utc}
    />
  );
};

Datetime.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  value: PropTypes.string,
  allowPastDate: PropTypes.bool,
  allowFutureDate: PropTypes.bool,
  utc: PropTypes.bool,
  disableFrom: PropTypes.object
};

export default Datetime;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { FaCalendarAlt, FaTimesCircle, FaSave } from 'react-icons/fa';

import { useInput } from '../../hooks';

import Input from '../Input';

const Datetime = ({
  className,
  props = {},
  onChange,
  onInput,
  onSave,
  allowPastDate = true,
  allowFutureDate = true,
  utc = false,
  disableFrom,
  showClear = false,
  extraActions = false
}) => {
  const { disabled } = props;

  const [date, setDate] = useState(props.value || '');
  const [isOpen, updateOpenState] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    updateOpenState(true);
    if ( ref.current && event.target.classList.contains('extra') && extraActions === true ) {
      event.target.closest(".rdt").removeAttribute('id');
      event.target.closest(".rdt").setAttribute('id','rdtOpened');
    };
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);

  useEffect(() => {
    setDate(props.value);
  }, [props.value]);

  const { name } = useInput({ props });

  function handleChange (moment) {
    const value = moment && moment.format('x');

    setDate(moment);

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

  /**
   * renderInput
   */

  function renderInput (defaultProps, openCalendar, closeCalendar) {
    function handleOnClick (e) {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (typeof defaultProps.onClick === 'function') {
        defaultProps.onClick(e);
      }
    }

    function clearCal() {
      defaultProps.onChange({ target: { value: "" } });
    }

    function closeCalendar(event) {
      event.target.closest(".rdt").removeAttribute('id');
      event.target.closest(".rdt").setAttribute('id','rdtClosed');
    }

    function closeCal(event) {
      saveCal();
      closeCalendar(event);
    }

    function saveCal() {
      return onSave(ReactDatetime.moment(defaultProps.value).valueOf());
    }

    const allProps = {
      value: defaultProps.value,
      onChange: defaultProps.onChange,
      onInput: defaultProps.onInput,
      onKeyDown: defaultProps.onKeydown,
      onFocus: defaultProps.onFocus,
      onClick: handleOnClick
    };

    function handleOnClear (e) {
      e.preventDefault();

      defaultProps.onChange({
        target: {
          value: ''
        }
      });

      setDate('');
    }

    return (
      <>
        <FaCalendarAlt
          {...defaultProps}
          {...allProps}
          className="icon-calendar"
        />
        <Input
          className={`datetime ${className} ${extraActions ? "extra" : ""}`}
          props={{
            ...props,
            autoComplete: 'off'
          }}
          {...allProps}
          disabled={disabled}
        />
        {showClear && (
          <p className="datetime-clear">
            <button onClick={handleOnClear}>
              <FaTimesCircle className="icon-times-circle" />
              Clear
            </button>
          </p>
        )}
        {extraActions && (
          <div className="datetime-controls">
            <button onClick={saveCal}>
              <FaSave className="icon-save" />
              Save
            </button>
            <button onClick={closeCal}>
              <FaTimesCircle className="icon-close" />
              Save &amp; Close
            </button>
          </div>        
        )}
      </>
    );
  }

  return (
    <>
      {!extraActions && (
        <ReactDatetime
          value={date}
          renderInput={renderInput}
          onChange={handleChange}
          isValidDate={isValidDate}
          utc={utc}
        />
      )}
      {extraActions && (
        <ReactDatetime
          value={date}
          renderInput={renderInput}
          onChange={handleChange}
          isValidDate={isValidDate}
          utc={utc}
          closeOnClickOutside={false}
          closeOnTab={false}
          ref={ref}
        />
      )}
    </>
  );
};

Datetime.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onSave: PropTypes.func,
  value: PropTypes.string,
  allowPastDate: PropTypes.bool,
  allowFutureDate: PropTypes.bool,
  utc: PropTypes.bool,
  disableFrom: PropTypes.object,
  showClear: PropTypes.bool,
  extraActions: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Datetime;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';

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
  extraActions = false,
  closeOnSelect = false
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

  // Help keep track of cursor while manually editing dates:
  // https://github.com/arqex/react-datetime/issues/755

  const inputElement = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  function handleInput () {
    setCursorPosition(inputElement.current?.selectionStart || 0);
  }

  useEffect(() => {
    inputElement.current?.setSelectionRange(cursorPosition, cursorPosition);
  },[date, cursorPosition]);

  /* 
   * Datepicker change handler/callback for date changes
   * {string} param is a Moment date object if valid date is input, 
   * If date is NOT valid, the input string is passed
  */
  function handleChange (moment) {
    let value;

    if (moment && moment.format) {
      value = moment.format('x');
    }

    setDate(moment);

    const virtualEvent = {
      target: {
        name,
        value
      }
    };

    if (typeof onChange === 'function' && value) {
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
      let dateTime = ReactDatetime.moment.utc(defaultProps.value);
      const value = dateTime && dateTime.format('x');

      setDate(dateTime);

      const virtualEvent = {
        target: {
          name,
          value
        }
      };

      return onSave(virtualEvent);
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
            ...defaultProps,
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
            <span className="datetime-ctl-button" onClick={closeCal}>
              <FaTimesCircle className="icon-close" />
              Save
            </span>
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
          inputProps={{
            onInput: handleInput,
            ref: inputElement,
          }}
          isValidDate={isValidDate}
          utc={utc}
          closeOnSelect={closeOnSelect}
        />
      )}
      {extraActions && (
        <ReactDatetime
          value={date}
          renderInput={renderInput}
          onChange={handleChange}
          isValidDate={isValidDate}
          inputProps={{
            onInput: handleInput,
            ref: inputElement,
          }}
          utc={utc}
          closeOnClickOutside={false}
          closeOnTab={false}
          closeOnSelect={closeOnSelect}
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

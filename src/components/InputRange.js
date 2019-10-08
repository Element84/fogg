import React from 'react';
import PropTypes from 'prop-types';
import ReactInputRange from 'react-input-range';

import { useStoredValue } from '../hooks';
import { chompFloat } from '../lib/util';

const InputRange = (props = {}) => {
  const {
    className,
    value,
    minValue,
    maxValue,
    onChange,
    onChangeComplete,
    ...rest
  } = props;
  const { step = 0.01 } = rest;

  const { value: storedValue, updateValue, saveChanges } = useStoredValue(
    value
  );

  const inputValue = {
    ...storedValue
  };

  // Determine how many decimal places the input range should be set to

  const floatPoint = step && `${parseFloat(step)}`.split('.')[1].length;

  let inputClassName = `input-range`;

  if (className) {
    inputClassName = `${inputClassName} ${className}`;
  }

  // If we dont have a number, we want to use the the min or max value as
  // we shouldnt attempt to formulate an invalid value type. Additionally,
  // we don't want to permit a value above or below the min/max, so default
  // to that min/max value

  if (typeof inputValue.min !== 'number' || inputValue.min < minValue) {
    inputValue.min = minValue;
  }

  if (typeof inputValue.max !== 'number' || inputValue.max > maxValue) {
    inputValue.max = maxValue;
  }

  // Take the "step" value and determine how many decimal places we should
  // normalize out visible value by

  if (typeof inputValue.min === 'number') {
    inputValue.min = chompFloat(inputValue.min, floatPoint);
  }

  if (typeof inputValue.max === 'number') {
    inputValue.max = chompFloat(inputValue.max, floatPoint);
  }

  function handleOnChange (data) {
    updateValue(data);
    if (typeof onChange === 'function') {
      onChange(data);
    }
  }

  function handleOnChangeComplete (data) {
    saveChanges();
    if (typeof onChangeComplete === 'function') {
      onChangeComplete(storedValue);
    }
  }

  const inputProps = {
    ...rest,
    className: inputClassName,
    value: inputValue,
    minValue,
    maxValue,
    onChange: handleOnChange,
    onChangeComplete: handleOnChangeComplete
  };

  return <ReactInputRange {...inputProps} />;
};

InputRange.propTypes = {
  className: PropTypes.string,
  value: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func
};

export default InputRange;

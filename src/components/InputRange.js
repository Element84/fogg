import React from 'react';
import PropTypes from 'prop-types';
import ReactInputRange from 'react-input-range';

const InputRange = ({ className, value, minValue, maxValue, ...rest }) => {
  const inputValue = {
    ...value
  };

  let inputClassName = `input-range`;

  if (className) {
    inputClassName = `${inputClassName} ${className}`;
  }

  // If either of the values arre out of their range or not a number, default to
  // the min/max. If it's not a number, most likely the value is getting set via
  // another control method like an input, which might mean it's in a state between
  // the original value and updating the final value, such as "0."

  if (typeof inputValue.min !== 'number' || inputValue.min < minValue) {
    inputValue.min = minValue;
  }

  if (typeof inputValue.max !== 'number' || inputValue.max > maxValue) {
    inputValue.max = maxValue;
  }

  const props = {
    ...rest,
    className: inputClassName,
    value: inputValue,
    minValue,
    maxValue
  };

  return <ReactInputRange {...props} />;
};

InputRange.propTypes = {
  className: PropTypes.string,
  value: PropTypes.shape({
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  minValue: PropTypes.number,
  maxValue: PropTypes.number
};

export default InputRange;

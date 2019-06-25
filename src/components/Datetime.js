import React from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { FaCalendarAlt } from 'react-icons/fa';

import { useInput } from '../hooks';

import Input from './Input';

const Datetime = ({ className, props, onChange, onInput }) => {
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

  function renderInput (defaultProps) {
    const allProps = {
      value: defaultProps.value || props.value || '',
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
          props={props}
          {...allProps}
        />
      </>
    );
  }

  return (
    <ReactDatetime
      renderInput={renderInput}
      onChange={handleChange}
      value={props.value || ''}
    />
  );
};

Datetime.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  value: PropTypes.string
};

export default Datetime;

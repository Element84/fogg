import React from 'react';
import PropTypes from 'prop-types';
import ReactDatetime from 'react-datetime';
import { FaCalendarAlt } from 'react-icons/fa';

import { useInput } from '../hooks';

import Input from './Input';

const Datetime = ({ className, props, onChange, onInput }) => {
  console.log(props);
  const { name } = useInput({ props });

  function handleChange (moment) {
    const value = moment.format('x');

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
    console.log(defaultProps);
    const allProps = {
      value: defaultProps.value || props.value,
      onChange: defaultProps.onChange,
      onInput: defaultProps.onInput,
      onKeyDown: defaultProps.onKeydown,
      onFocus: defaultProps.onFocus
    };

    return (
      <>
        <FaCalendarAlt {...defaultProps} />
        <Input
          className={`datetime ${className}`}
          props={props}
          {...allProps}
        />
      </>
    );
  }

  return <ReactDatetime renderInput={renderInput} onChange={handleChange} />;
};

Datetime.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  value: PropTypes.string
};

export default Datetime;

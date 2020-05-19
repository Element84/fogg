import React from 'react';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';

import { useStoredValue } from '../../hooks';

import FormInput from '../FormInput';

const QUERY_COMPLETE_DEBOUNCE = 300;

const FormInputDebounced = ({ value, onChange, ...rest }) => {
  const { value: storedValue, updateValue } = useStoredValue(value);

  const [debouncedOnChange] = useDebouncedCallback(
    onChange,
    QUERY_COMPLETE_DEBOUNCE
  );

  function handleOnChange (e = {}) {
    e.persist();
    const { target = {} } = e;
    updateValue(target.value);
    if (typeof debouncedOnChange === 'function') {
      debouncedOnChange(e);
    }
  }

  return <FormInput value={storedValue} onChange={handleOnChange} {...rest} />;
};

FormInputDebounced.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export default FormInputDebounced;

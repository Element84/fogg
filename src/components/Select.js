import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { useInput } from '../hooks';

const SelectInput = ({ className, props }) => {
  const { inputProps } = useInput({ props });
  const {
    placeholder,
    disabled: isDisabled,
    required: isRequired,
    options,
    defaultValue
  } = inputProps;

  const isClearable = true;
  const isSearchable = true;

  const defaultVal = options.filter(option => option.value === defaultValue);
  delete inputProps.defaultValue;

  return (
    <div className="select">
      <Select
        className={`select ${className}`}
        options={options}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        placeholder={placeholder || '- Please Select -'}
        defaultValue={defaultVal}
        {...inputProps}
      />
      <input
        required={isRequired}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
          position: 'absolute'
        }}
      ></input>
    </div>
  );
};

SelectInput.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func
};

export default SelectInput;

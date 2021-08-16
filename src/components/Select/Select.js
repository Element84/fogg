import React from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect } from 'react-select';

import { useInput } from '../../hooks';

const Select = ({ className, props, isMulti = false }) => {
  const { inputProps } = useInput({ props });

  const {
    placeholder,
    disabled: isDisabled,
    searchable: isSearchable = true,
    clearable: isClearable = true,
    options,
    defaultValue
  } = inputProps;

  let defaultVal = defaultValue;
  if (!defaultValue.length) {
    defaultVal = options.filter((option) => option.value === defaultValue);
  }
  delete inputProps.defaultValue;

  return (
    <ReactSelect
      className={`select ${className}`}
      options={options}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      placeholder={placeholder || '- Please Select -'}
      defaultValue={defaultVal}
      {...inputProps}
    />
  );
};

Select.propTypes = {
  className: PropTypes.string,
  props: PropTypes.object,
  onChange: PropTypes.func,
  onInput: PropTypes.func
};

export default Select;

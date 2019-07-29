import React from 'react';
import PropTypes from 'prop-types';

import { useInput } from '../hooks';

import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Datetime from './Datetime';

/**
 * FormInput
 * @description Default input component with variable type option
 */

const FormInput = props => {
  const { className, disabled, dataList, allowPastDate } = props;
  const { id, type, label, isInvalid, inputProps } = useInput({ props });

  let input;
  let inputClassName = `form-input ${className || ''}`;
  let fieldClassName = 'form-input-field';

  if (type) {
    inputClassName = `${inputClassName} form-input-${type}`;
  }

  if (isInvalid) {
    inputClassName = `${inputClassName} form-input-invalid`;
  }

  if (disabled) {
    inputClassName = `${inputClassName} form-input-disabled`;
  }

  function handleOnInput (event) {
    if (typeof inputProps.onInput === 'function') {
      inputProps.onInput(event);
    }
  }

  function handleOnChange (event) {
    if (typeof inputProps.onChange === 'function') {
      inputProps.onChange(event);
    }
  }

  if (type === 'select') {
    input = (
      <Select
        className={fieldClassName}
        props={inputProps}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    );
  } else if (type === 'textarea') {
    input = (
      <Textarea
        className={fieldClassName}
        props={inputProps}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    );
  } else if (type === 'datetime') {
    input = (
      <Datetime
        className={fieldClassName}
        props={inputProps}
        onChange={handleOnChange}
        onInput={handleOnInput}
        allowPastDate={allowPastDate}
      />
    );
  } else {
    input = (
      <Input
        className={fieldClassName}
        props={inputProps}
        onChange={handleOnChange}
        onInput={handleOnInput}
        dataList={dataList}
      />
    );
  }

  return (
    <div className={inputClassName}>
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}

      {input}
    </div>
  );
};

FormInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  dataList: PropTypes.array,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  autoCapitalize: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  pattern: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  allowPastDate: PropTypes.bool
};

export default FormInput;

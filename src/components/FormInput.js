import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext, FormNoContext } from '../context';
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
  // TODO: is NoContext a good pattern?

  const { invalidFields = [], updateField } =
    useContext(FormContext) || FormNoContext;

  const { id, name, type, label, inputRules } = useInput({ props });

  const { onChange, onInput, className } = props;

  let input;
  let inputClassName = `form-input ${className || ''}`;
  let fieldClassName = 'form-input-field';

  // Update the field immediately with any local rules for validation

  updateField(name, undefined, inputRules);

  if (type) {
    inputClassName = `${inputClassName} form-input-${type}`;
  }

  // If the input is invalid, tag an extra class for styling

  if (Array.isArray(invalidFields) && invalidFields.includes(name)) {
    inputClassName = `${inputClassName} form-input-invalid`;
  }

  if (type === 'select') {
    input = (
      <Select
        className={fieldClassName}
        props={props}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    );
  } else if (type === 'textarea') {
    input = (
      <Textarea
        className={fieldClassName}
        props={props}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    );
  } else if (type === 'datetime') {
    input = (
      <Datetime
        className={fieldClassName}
        props={props}
        onChange={handleOnChange}
        onInput={handleOnInput}
      />
    );
  } else {
    input = (
      <Input
        className={fieldClassName}
        props={props}
        onChange={handleOnChange}
        onInput={handleOnInput}
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

  function handleOnInput (event) {
    updateField(event.target.name, event.target.value);

    if (typeof onInput === 'function') {
      onInput(event);
    }
  }

  function handleOnChange (event) {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  }
};

FormInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
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
  onFocus: PropTypes.func
};

export default FormInput;

import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { FaCalendarAlt } from 'react-icons/fa';

const INPUT_PROPS_WHITELIST = [
  'id',
  'name',
  'placeholder',
  'autoComplete',
  'autoCorrect',
  'autoCapitalize',
  'minLength',
  'maxLength',
  'pattern',
  'disabled',
  'required',
  'inputMode'
];

/**
 * FormInput
 * @description Default input component with variable type option
 */

const FormInput = props => {
  const {
    value = '',
    type = 'text',
    label,
    options,
    onInput,
    onChange,
    className
  } = props;
  let inputProps = {};
  let input;

  // Only include the input props that we know for sure we want to have in the DOM

  for (let key in props) {
    if (INPUT_PROPS_WHITELIST.includes(key)) {
      inputProps[key] = props[key];
    }
  }

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  function renderInput (props) {
    const allProps = Object.assign(props, inputProps);
    return (
      <>
        <FaCalendarAlt {...props} />
        <input type="text" {...allProps} />
      </>
    );
  }

  if (type === 'select') {
    input = (
      <select
        defaultValue={value}
        onInput={handleOnInput}
        onChange={handleOnChange}
        {...inputProps}
      >
        <option value="">
          {inputProps.placeholder || '- Please Select -'}
        </option>

        {options.map((option, index) => {
          return (
            <option
              key={`FormInput-Select-Option-${index}`}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    );
  } else if (type === 'textarea') {
    input = (
      <textarea
        defaultValue={value}
        type={type}
        onInput={handleOnInput}
        onChange={handleOnChange}
        {...inputProps}
      />
    );
  } else if (type === 'datetime') {
    input = <Datetime renderInput={renderInput} />;
  } else {
    input = (
      <input
        defaultValue={value}
        type={type}
        onInput={handleOnInput}
        onChange={handleOnChange}
        {...inputProps}
      />
    );
  }

  return (
    <div className={`form-input form-input-${type} ${className || ''}`}>
      { label && (
        <label className="form-label" htmlFor={inputProps.id}>
          {label}
        </label>
      )}

      {input}
    </div>
  );

  function handleOnInput (event) {
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
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
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

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormContext, FormNoContext } from '../context';

import { filterObject } from '../lib/util';

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
  'inputMode',
  'defaultValue'
];

/**
 * FormInput
 * @description Default input component with variable type option
 */

const FormInput = props => {
  // TODO: is NoContext a good pattern?

  const { invalidFields = [], updateField } =
    useContext(FormContext) || FormNoContext;

  const { type = 'text', label, options, onInput, onChange } = props;

  // Only include the input props that we know for sure we want to have in the DOM

  const inputProps = filterObject(props, key =>
    INPUT_PROPS_WHITELIST.includes(key)
  );

  let input;
  let className = `form-input form-input-${type}`;

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  // If the input is invalid, tag an extra class for styling

  if (Array.isArray(invalidFields) && invalidFields.includes(inputProps.name)) {
    className = `${className} form-input-invalid`;
  }

  inputProps.onInput = handleOnInput;
  inputProps.onChange = handleOnChange;

  if (type === 'select') {
    input = (
      <select className="form-input-field" {...inputProps}>
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
      <textarea className="form-input-field" type={type} {...inputProps} />
    );
  } else {
    input = <input className="form-input-field" type={type} {...inputProps} />;
  }

  return (
    <div className={className}>
      <label className="form-label" htmlFor={inputProps.id}>
        {label}
      </label>

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
  onChange: PropTypes.func
};

export default FormInput;

import React from 'react';
import PropTypes from 'prop-types';

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
];

/**
 * FormInput
 * @description Default input component with variable type option
 */

const FormInput = (props) => {

  const { value = '', type = 'text', label, onInput, onChange } = props;
  let input_props = {};

  for ( let key in props ) {
    if ( INPUT_PROPS_WHITELIST.includes(key) ) {
      input_props[key] = props[key];
    }
  }

  if ( !input_props.name ) {
    input_props.name = input_props.id;
  }

  function handleOnInput() {
    if ( typeof onInput === 'function' ) {
      onInput(event);
    }
  }

  function handleOnChange() {
    if ( typeof onChange === 'function' ) {
      onChange(event);
    }
  }

  return (
    <div className="form-input">

      <label className="form-label" htmlFor={input_props.id}>
        { label }
      </label>

      <input defaultValue={value} type={type} onInput={handleOnInput} onChange={handleOnChange} {...input_props} />

    </div>
  );

}

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoCorrect: PropTypes.string,
  autoCapitalize: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  pattern: PropTypes.string,
  disabled: PropTypes.string,
  required: PropTypes.string,
  inputMode: PropTypes.string,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
};

export default FormInput;
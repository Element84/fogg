import React from 'react';
import PropTypes from 'prop-types';

import { FaCheck } from 'react-icons/fa';

/**
 * InputButton
 * @description Button component that houses a radio or checkbox input. UI toggles based on input checked status
 * @param {components} children: Usage - <RadioButton>[content]</RadioButton>
 * @param {string} type: radio or checkbox
 * @param {string} id: input ID
 * @param {string} value: value of the input
 * @param {string} name: name attribute of the input
 * @param {bool} checked: force the UI to appear checked
 */

const InputButton = ({
  children,
  type = 'radio',
  label,
  id,
  value,
  name,
  onChange,
  isChecked = false,
  required = false,
  disabled = false
}) => {
  const inputProps = {
    id,
    type,
    value,
    name,
    onChange,
    required,
    isChecked,
    disabled
  };

  // If we didn't supply a name, default to the ID

  if (!inputProps.name) {
    inputProps.name = inputProps.id;
  }

  return (
    <div className={`${type}-button`}>
      <InputButtonInput {...inputProps} />

      <label htmlFor={id}>
        <div className={`${type}-button-checkbox`}>
          <span>
            <FaCheck />
          </span>
        </div>

        <div className="input-button-content">{children || label}</div>
      </label>
    </div>
  );
};

InputButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

export default InputButton;

/**
 * InputButtonInput
 * @description Input element for the radio component. This is visually hidden
 * @param {string} id: input ID
 * @param {string} type: radio or checkbox
 * @param {string} value: value of the input
 * @param {string} name: input name attribute
 */

const InputButtonInput = ({
  id,
  type,
  value,
  name,
  required,
  onChange,
  isChecked = false,
  disabled = false
}) => {
  if (!name) return null;

  let extendedAttributes = {};

  if (isChecked) {
    extendedAttributes.defaultChecked = true;
  }

  if (disabled) {
    extendedAttributes.disabled = true;
  }

  return (
    <input
      type={type}
      id={id}
      className="visually-hidden"
      value={value}
      name={name}
      required={required}
      onChange={handleOnChange}
      {...extendedAttributes}
    />
  );

  function handleOnChange (event) {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  }
};

InputButtonInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

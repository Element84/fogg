import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';

import { useInput } from '../../hooks';

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
  forwardedRef,
  icon = <FaCheck />,
  ...rest
}) => {
  const inputRef = forwardedRef || createRef();

  const {
    className,
    value,
    isChecked = false,
    controlChecked = false,
    disabled = false
  } = rest;

  const { id, type = 'radio', label, isInvalid, inputProps } = useInput({
    inputRef,
    props: rest
  });

  let inputClassName = `${type}-button`;
  const extendedAttributes = {};

  if (isInvalid) {
    inputClassName = `${inputClassName} input-button-invalid`;
  }

  if (controlChecked) {
    extendedAttributes.checked = !!isChecked;
  } else {
    extendedAttributes.defaultChecked = !!isChecked;
  }

  if (disabled) {
    extendedAttributes.disabled = true;
  }

  if (className) {
    inputClassName = `${inputClassName} ${className || ''}`;
  }

  return (
    <span className={inputClassName}>
      <input
        ref={inputRef}
        className="visually-hidden"
        value={value}
        {...inputProps}
        {...extendedAttributes}
      />

      <label htmlFor={id}>
        <span className={`${type}-button-checkbox`}>
          <span>{icon}</span>
        </span>

        <span className="input-button-content">{children || label}</span>
      </label>
    </span>
  );
};

InputButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  forwardedRef: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool
};

const InputButtonWithRefs = React.forwardRef(function inputButton (props, ref) {
  return <InputButton {...props} forwardedRef={ref} />;
});

InputButtonWithRefs.displayName = 'InputButtonWithRefs';

export default InputButtonWithRefs;

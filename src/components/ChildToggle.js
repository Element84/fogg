import React from 'react';
import PropTypes from 'prop-types';
import InputButton from './InputButton';
import { useChildToggle } from '../hooks';

/**
 * ChildToggle
 * @description A component that toggles rendering of children elements based
 * on whether or not checkbox is checked.
 */

const ChildToggle = ({
  children,
  className = '',
  name,
  label,
  id,
  value,
  isChecked = false,
  isField = false,
  icon,
  onChange
}) => {
  const { checked, handleChange } = useChildToggle(isChecked);

  const inputProps = {
    type: 'checkbox',
    name,
    label,
    id,
    value,
    isChecked,
    isField,
    icon
  };

  // If we didn't supply a name and the button is a field, default to the ID

  if (!inputProps.name && !!isField) {
    inputProps.name = inputProps.id;
  }

  function handleToggleOnChange (e) {
    const isChecked = handleChange(e);
    if (typeof onChange === 'function') {
      onChange(e, {
        isChecked
      });
    }
  }

  return (
    <div className={`child-toggle ${className}`} data-is-checked={checked}>
      <InputButton {...inputProps} onChange={handleToggleOnChange} />
      <div className="children">{checked && children}</div>
    </div>
  );
};

ChildToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  isField: PropTypes.bool,
  onChange: PropTypes.func
};

export default ChildToggle;

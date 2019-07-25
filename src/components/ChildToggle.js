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
  isField = false
}) => {
  const { checked, handleChange } = useChildToggle(isChecked);

  const inputProps = {
    type: 'checkbox',
    name,
    label,
    id,
    value,
    isChecked,
    isField
  };

  // If we didn't supply a name and the button is a field, default to the ID

  if (!inputProps.name && !!isField) {
    inputProps.name = inputProps.id;
  }

  return (
    <div className={`child-toggle ${className}`}>
      <InputButton {...inputProps} onChange={handleChange} />
      <div className="children">{checked && children}</div>
    </div>
  );
};

ChildToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  isChecked: PropTypes.bool,
  isField: PropTypes.bool
};

export default ChildToggle;

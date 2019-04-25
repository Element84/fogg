import React from 'react';
import PropTypes from 'prop-types';
import InputButton from './InputButton';
import { useChildToggle } from '../hooks';

/**
 * ChildToggle
 * @description A component that toggles rendering of children elements based
 * on whether or not checkbox is checked.
 */

const ChildToggle = ({ children, className = '', name, label, id }) => {
  const { checked, handleChange } = useChildToggle();

  return (
    <div className={`child-toggle ${className}`}>
      <InputButton
        type="checkbox"
        name={name}
        label={label}
        id={id}
        onChange={handleChange}
      />
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
  id: PropTypes.string
};

export default ChildToggle;

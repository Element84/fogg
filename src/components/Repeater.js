import React from 'react';
import PropTypes from 'prop-types';
import InputButton from './InputButton';
import { useRepeater } from '../hooks';

const Repeater = ({ children }) => {
  const { checked, handleChange } = useRepeater();

  return (
    <div className="repeater">
      <InputButton
        type="checkbox"
        name="repeater"
        label="Repeat"
        id="repeater"
        onChange={handleChange}
      />
      <div className="input-group">{checked && children}</div>
    </div>
  );
};

Repeater.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Repeater;

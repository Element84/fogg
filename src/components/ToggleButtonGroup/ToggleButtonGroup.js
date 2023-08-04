import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a Button Group for selecting a single, unique option.
 * FUTURE: Add multiSelect variation and accept activeValue as array
 * @param {object} props
 * @param {{
  *  label: string,
  *  value: string,
  *  subLabel?: string,
  *  icon?: React.Component|HTMLElement
  * }[]} props.options array of objects that defines the label, value, subLabel, and icon of the toggle buttons
 * @param {string} [props.activeValue='']
 * @param {func} props.onChange
 * @param {string} [props.className='']
 */
const ToggleButtonGroup = ({ options, activeValue, onChange, className }) => {
  // Pass selected value (and event) to parent
  const onClickHandler = (e, value) => {
    e.preventDefault();
    onChange(value);
  };

  return (
    <div className="toggle-button-group">
      {options.map(({ label, value, subLabel, icon }) => {
        let cssClass = 'button button-secondary';
        if (value === activeValue) cssClass += ' active';
        if (icon) cssClass += ' has-icon';
        if (className) cssClass += ` ${className}`;

        return (
          <button
            className={cssClass}
            onClick={(e) => onClickHandler(e, value)}
            key={label}
          >
            {icon && icon}
            {label}
            <small>{subLabel && subLabel}</small>
          </button>
        );
      })}
    </div>
  );
};

ToggleButtonGroup.propTypes = {
  activeValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default ToggleButtonGroup;

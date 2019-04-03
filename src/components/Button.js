import React from 'react';
import PropTypes from 'prop-types';

import WonderLink from './WonderLink';

const Button = ({
  text = 'Button',
  to = null,
  full = false,
  onClick = null,
  disabled = false,
  className = null,
  eventCategory = null,
  eventAction = null,
  eventLabel = null
} = {}) => {
  let buttonElement = null;

  className = `button ${className}`;

  const attributes = {
    to,
    onClick,
    text,
    disabled,
    'data-event-category': eventCategory,
    'data-event-action': eventAction,
    'data-event-label': eventLabel
  };

  if (disabled) {
    className += ' button-disabled';
    attributes.disabled = true;
  }

  if (!to || disabled) {
    buttonElement = <button {...attributes}>{text}</button>;
  } else {
    buttonElement = (
      <WonderLink to={to} {...attributes}>
        {text}
      </WonderLink>
    );
  }

  return (
    <span className={className} data-full={full}>
      {buttonElement}
    </span>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.string,
  full: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Button;

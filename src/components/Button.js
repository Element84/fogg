import React from 'react';
import PropTypes from 'prop-types';

import WonderLink from './WonderLink';

const Button = ({
  children = 'Button',
  to = null,
  full = false,
  onClick = null,
  disabled = false,
  className = null,
  eventCategory = null,
  eventAction = null,
  eventLabel = null,
  ...props
} = {}) => {
  let buttonElement = null;

  className = `button ${className || ''}`;

  const attributes = {
    to,
    onClick,
    children,
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
    buttonElement = (
      <button {...attributes} {...props}>
        {children}
      </button>
    );
  } else {
    buttonElement = (
      <WonderLink to={to} {...attributes} {...props}>
        {children}
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

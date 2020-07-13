import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

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
  type,
  external = false,
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

  // Allow one or more instances of a "type" attribute
  // The type really just creates a new button class that
  // we can then style within the buttons SCSS

  if (type) {
    if (typeof type === 'string') {
      type = [type];
    }
    type.forEach((t) => {
      className += ` button-${t}`;
    });
  }

  if (!to || disabled) {
    buttonElement = (
      <button {...attributes} {...props}>
        {children}
      </button>
    );
  } else if (external) {
    buttonElement = (
      <a href={to} {...attributes} {...props}>
        {children}
      </a>
    );
  } else {
    buttonElement = (
      <Link to={to} {...attributes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <span className={className} data-full={full}>
      {buttonElement}
    </span>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.string,
  full: PropTypes.bool,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Button;

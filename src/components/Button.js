import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import { Link } from 'gatsby';

/**
 * Button
 * @description A button that wraps a React Router link. If no to exists, it's a normal buttono
 */

const Button = ({
  text = 'Button',
  to = null,
  full = false,
  onClick = null,
  disabled = false,
  eventCategory = null,
  eventAction = null,
  eventLabel = null
}) => {
  let className = 'button button-link';

  let buttonLinkAttributes = {
    to: to,
    onClick: onClick,
    text: text,
    disabled: disabled,
    eventCategory: eventCategory,
    eventAction: eventAction,
    eventLabel: eventLabel
  };

  if (disabled) {
    className += ' button-disabled';
  }

  return (
    <span className={className} data-full={full}>
      <ButtonElement {...buttonLinkAttributes} />
    </span>
  );
};

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.string,
  full: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default Button;

/*
 * ButtonElement
 */

const ButtonElement = ({
  to,
  text,
  onClick,
  disabled = false,
  eventCategory,
  eventAction,
  eventLabel
}) => {
  if (React.isValidElement(eventLabel)) {
    eventLabel = ReactDOMServer.renderToString(eventLabel);
  }

  const attributes = {
    'data-event-category': eventCategory,
    'data-event-action': eventAction,
    'data-event-label': eventLabel
  };

  if (disabled) {
    attributes.disabled = true;
  }

  if (!to || disabled) {
    return (
      <button onClick={onClick} {...attributes}>
        {text}
      </button>
    );
  }

  return (
    <Link to={to} onClick={onClick} {...attributes}>
      {text}
    </Link>
  );
};

ButtonElement.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

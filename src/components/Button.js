import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

import { Link } from 'gatsby';

/**
 * Button
 * @description A button that wraps a React Router link. If no to exists, it's a normal button
 */

 // needs a active attribute
 // need an invalid attribute

const Button = ({
  text = 'Button',
  to = null,
  full = false,
  onClick = null,
  disabled = false,
  active = false,
  eventCategory = null,
  eventAction = null,
  eventLabel = null,
}) => {

  let class_name = 'button button-link';

  let ButtonLinkAttributes = {
    to,
    onClick,
    text,
    disabled,
    active,
    eventCategory,
    eventAction,
    eventLabel,
  };

  if ( disabled ) {

    class_name += ' button-disabled';

  }

  if (active) {
    class_name += ' button-active'
  }

  return (
    <span className={class_name} data-full={full}>
      <ButtonElement {...ButtonLinkAttributes} />
    </span>
  );

};

Button.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  to: PropTypes.string,
  full: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default Button;


/*
 * ButtonElement
 */

const ButtonElement = ({ to, text, onClick, disabled = false, active = false, eventCategory, eventAction, eventLabel, }) => {

  if ( React.isValidElement( eventLabel )) {

    eventLabel = ReactDOMServer.renderToString( eventLabel );

  }

  const attributes = {
    'data-event-category' : eventCategory,
    'data-event-action' : eventAction,
    'data-event-label' : eventLabel,
  };

  if ( disabled ) {

    attributes.disabled = true;

  }

  if ( !to || disabled ) {

    return (
      <button onClick={onClick} {...attributes}>
        {text}
      </button>
    );

  }

  else if (active) {

    return (
      <button onClick={onClick} {...attributes}>
        {text}
      </button>
    )

  }

  else {
    return (
      <Link to={to} onClick={onClick} {...attributes}>
        {text}
      </Link>
    );
  }
};

ButtonElement.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  eventCategory: PropTypes.string,
  eventAction: PropTypes.string,
  eventLabel:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};
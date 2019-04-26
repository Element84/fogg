import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const NavBar = ({ orientation, primary, secondary, activePage }) => {
  let orientationClass = orientation ? 'nav-bar-vertical' : '';

  /**
   * createButton
   * @description Creates a button using
   */

  function createButton (link) {
    return (
      <Button
        key={`${link.id}-${link.to}`}
        to={link.to}
        className={activePage === link.to ? 'nav-bar-active-button' : ''}
      >
        {link.icon}
      </Button>
    );
  }

  return (
    <div className={'nav-bar ' + orientationClass}>
      <div className="nav-bar-primary">{primary.map(createButton)}</div>
      <div className="nav-bar-secondary">{secondary.map(createButton)}</div>
    </div>
  );
};

NavBar.propTypes = {
  orientation: PropTypes.string,
  primary: PropTypes.arrayOf(PropTypes.object),
  secondary: PropTypes.arrayOf(PropTypes.object),
  activePage: PropTypes.string
};

export default NavBar;

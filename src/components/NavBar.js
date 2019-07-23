import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import { valueStartsWith, normalizePathname } from '../lib/util';

const NavBar = ({ orientation, primary, secondary, activePage }) => {
  let orientationClass = orientation ? 'nav-bar-vertical' : '';
  const normalizedActivePage = normalizePathname(activePage);

  /**
   * createButton
   * @description Creates a button using
   */

  function createButton (link) {
    const normalizedTo = normalizePathname(link.to);
    return (
      <Button
        key={`${link.id}-${link.to}`}
        to={link.to}
        className={
          valueStartsWith(normalizedActivePage, normalizedTo)
            ? 'nav-bar-active-button'
            : ''
        }
      >
        {link.icon}
      </Button>
    );
  }

  return (
    <div className={'nav-bar ' + orientationClass}>
      <div className="nav-bar-section nav-bar-primary">
        {primary.map(createButton)}
      </div>
      <div className="nav-bar-section nav-bar-secondary">
        {secondary.map(createButton)}
      </div>
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

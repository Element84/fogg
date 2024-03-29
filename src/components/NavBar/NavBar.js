import React from 'react';
import PropTypes from 'prop-types';

import { valueStartsWith } from '../../lib/util';
import { normalizePathname } from '../../lib/location';

import Button from '../Button';

const NavBar = ({ orientation, primary, secondary, activePage }) => {
  const orientationClass = orientation
    ? 'nav-bar-vertical'
    : 'nav-bar-horizontal';
  const normalizedActivePage = normalizePathname(activePage);

  /**
   * createButton
   * @description Creates a button using
   */

  function createButton (link = {}) {
    const { to, icon, ...options } = link;
    const normalizedTo = normalizePathname(to);
    return (
      <Button
        to={to}
        className={
          valueStartsWith(normalizedActivePage, normalizedTo)
            ? 'nav-bar-active-button'
            : ''
        }
        {...options}
      >
        {icon}
      </Button>
    );
  }

  return (
    <div className={'nav-bar ' + orientationClass}>
      <div className="nav-bar-section nav-bar-primary">
        <ul>
          {primary.map((link, index) => {
            return (
              <li key={`NavBar-Primary-Link-${index}`}>{createButton(link)}</li>
            );
          })}
        </ul>
      </div>
      <div className="nav-bar-section nav-bar-secondary">
        <ul>
          {secondary.map((link, index) => {
            return (
              <li key={`NavBar-Secondary-Link-${index}`}>
                {createButton(link)}
              </li>
            );
          })}
        </ul>
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

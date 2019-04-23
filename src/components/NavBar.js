import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const NavBar = ({ orientation, primary, secondary }) => {
  let currentPage = window.location.pathname;

  return (
    <div className="nav-bar">
      <ul className={orientation}>
        {primary.map(link => {
          return (
            <li key={link.to}>
              <Button
                to={link.to}
                text={link.icon}
                className={currentPage === link.to ? 'isActive' : ''}
              />
            </li>
          );
        })}
        {secondary.map(link => {
          return (
            <li key={link.to}>
              <Button
                to={link.to}
                text={link.icon}
                className={currentPage === link.to ? 'isActive' : ''}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

NavBar.propTypes = {
  orientation: PropTypes.string,
  primary: PropTypes.arrayOf(PropTypes.object),
  secondary: PropTypes.arrayOf(PropTypes.object)
};

export default NavBar;

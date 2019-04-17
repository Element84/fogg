import React from 'react';
import PropTypes from 'prop-types';

const NavLinks = ({ routes, active }) => {
  return (
    <div className="nav">
      <ul className="nav-list">
        {routes.map((route, index) => {
          return (
            <li data-active={route.id === active} key={index}>
              <a href={route.id}>{route.label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

NavLinks.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  active: PropTypes.string
};

export default NavLinks;

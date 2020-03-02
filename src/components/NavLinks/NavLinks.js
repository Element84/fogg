import React from 'react';
import PropTypes from 'prop-types';

import WonderLink from '../WonderLink';

const NavLinks = ({ routes, active }) => {
  return (
    <div className="nav">
      <ul className="nav-list">
        {routes.map((route, index) => {
          return (
            <li data-active={route.id === active} key={index}>
              <WonderLink to={route.to}>{route.label}</WonderLink>
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

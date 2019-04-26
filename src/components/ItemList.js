import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';

import WonderLink from './WonderLink';

const ItemList = ({ items = [], className, actionIcon }) => {
  return (
    <div className={`item-list ${className || ''}`}>
      <ul>
        {Array.isArray(items) &&
          items.map((item, index) => {
            const { label, to } = item;

            return (
              <li className="item-list-item" key={`ItemList-Item-${index}`}>
                <WonderLink to={to}>
                  {label}
                  <span className="item-list-item-action" aria-hidden="true">
                    {actionIcon || <FaChevronRight />}
                  </span>
                </WonderLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  actionIcon: PropTypes.node
};

export default ItemList;

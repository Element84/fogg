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
            const { thumb, label, sublabels, to } = item;
            let { icon } = item;

            if (actionIcon) {
              icon = actionIcon;
            }

            if (!icon && icon !== false) {
              icon = <FaChevronRight />;
            }

            const additional = Array.isArray(sublabels)
              ? sublabels
              : [sublabels];

            return (
              <li className="item-list-item" key={`ItemList-Item-${index}`}>
                <WonderLink to={to}>
                  {thumb && (
                    <span className="item-list-item-thumb">
                      <img src={thumb} alt={`${label} Thumbnail`} />
                    </span>
                  )}
                  <span className="item-list-item-content">
                    <span className="item-list-item-label">{label}</span>
                    {additional &&
                      additional.map((item, index) => {
                        return (
                          <span
                            key={`ItemListItemSublabel-${index}`}
                            className="item-list-item-sublabel"
                          >
                            {item}
                          </span>
                        );
                      })}
                    {icon !== false && (
                      <span
                        className="item-list-item-action"
                        aria-hidden="true"
                      >
                        {icon || <FaChevronRight />}
                      </span>
                    )}
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

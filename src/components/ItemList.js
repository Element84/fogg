import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';

import WonderLink from './WonderLink';
import InputButton from './InputButton';

const ItemList = ({
  items = [],
  className,
  actionIcon,
  onItemMouseEnter,
  onItemMouseLeave,
  onCheck
}) => {
  return (
    <div className={`item-list ${className || ''}`}>
      <ul>
        {Array.isArray(items) &&
          items.map((item, index) => {
            const {
              className,
              thumb,
              label,
              sublabels,
              to,
              onClick,
              id,
              isChecked
            } = item;
            let { icon } = item;
            let itemClassName = 'item-list-item';

            if (className) {
              itemClassName = `${itemClassName} ${className}`;
            }

            if (actionIcon) {
              icon = actionIcon;
            }

            if (!icon && icon !== false) {
              icon = <FaChevronRight />;
            }

            const additional = Array.isArray(sublabels)
              ? sublabels
              : [sublabels];

            const itemProps = {
              id,
              className: itemClassName,
              onMouseLeave: onItemMouseLeave,
              onMouseEnter: onItemMouseEnter
            };

            return (
              <li key={`ItemList-Item-${index}`} {...itemProps}>
                {onCheck && (
                  <InputButton
                    id={`item-list-checkbox-${index}`}
                    name={`item-list-checkbox-${index}`}
                    type="checkbox"
                    value={id}
                    onChange={onCheck}
                    isChecked={isChecked || false}
                  />
                )}
                <WonderLink to={to} onClick={onClick}>
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
  actionIcon: PropTypes.node,
  onItemMouseEnter: PropTypes.func,
  onItemMouseLeave: PropTypes.func,
  onCheck: PropTypes.func
};

export default ItemList;

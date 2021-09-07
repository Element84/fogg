import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FaChevronRight } from 'react-icons/fa';

import WonderLink from '../WonderLink';
import InputButton from '../InputButton';

const ItemList = ({
  items = [],
  className,
  actionIcon,
  onItemMouseEnter,
  onItemMouseLeave,
  onCheck,
  subListIcon
}) => {

  const [currentSubLink, setCurrentSubLink] = useState('');

  const handleClick = (index) => () => {
    if ( currentSubLink === `sublist-item-${index}`){
      setCurrentSubLink('');
    } else {
      setCurrentSubLink(`sublist-item-${index}`);
    }
  };

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
              onClick,
              id,
              isChecked
            } = item;
            let { icon } = item;
            let { to } = item;
            let { hasChildren, children } = item;
            let itemClassName = `${hasChildren && currentSubLink === `sublist-item-${index}` ? 'item-list-item has-children' : 'item-list-item'} ${hasChildren ? 'is-parent' : ''}`;

            if (className) {
              itemClassName = `${itemClassName} ${className}`;
            }

            if (actionIcon) {
              icon = actionIcon;
            }

            if (!icon && icon !== false) {
              icon = <FaChevronRight />;
            }

            if (hasChildren) {
              to = null;
            }

            const additional = Array.isArray(sublabels)
              ? sublabels
              : [sublabels];

            const additionalList = Array.isArray(children)
              ? children
              : [];

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
                    controlChecked={true}
                  />
                )}
                <WonderLink to={to} onClick={onClick}>
                  {thumb && (
                    <span className="item-list-item-thumb">
                      <img src={thumb} alt={`${label} Thumbnail`} />
                    </span>
                  )}
                  <span 
                    className={`item-list-item-content ${hasChildren ? 'sub-list-parent' : ''}`} 
                    id={index}
                    onClick={(hasChildren && handleClick(index)) || null}
                  >
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
                {hasChildren && currentSubLink === `sublist-item-${index}` && (
                  <ul className={`sub-list sublist-item-${index}`}>
                    {Array.isArray(additionalList) &&
                      additionalList.map((subItem, index) => {
                        const subItemProps = {
                          id,
                          className: 'item-list-item',
                          onMouseLeave: onItemMouseLeave,
                          onMouseEnter: onItemMouseEnter
                        };
                        
                        return (
                          <li key={`ItemList-Item-${index}`}  {...subItemProps}>
                            {subListIcon && (
                              <span className="sublink-icon">
                                <img src={subListIcon} alt="Rocket Location Icon" />
                              </span>
                            )}
                            {onCheck && (
                              <InputButton
                                id={`item-list-checkbox-${index}`}
                                name={`item-list-checkbox-${index}`}
                                type="checkbox"
                                value={subItem.id}
                                onChange={onCheck}
                                isChecked={subItem.isChecked || false}
                                controlChecked={true}
                              />
                            )}
                            <WonderLink to={subItem.to} onClick={subItem.onClick}>
                              {subItem.thumb && (
                                <span className="item-list-item-thumb">
                                  <img src={subItem.thumb} alt={`${subItem.label} Thumbnail`} />
                                </span>
                              )}
                              <span className="item-list-item-content">
                                <span className="item-list-item-label">{subItem.label}</span>
                                {subItem.additional &&
                                  subItem.additional.map((subAdditionalItem, index) => {
                                    return (
                                      <span
                                        key={`ItemListItemSublabel-${index}`}
                                        className="item-list-item-sublabel"
                                      >
                                        {subAdditionalItem}
                                      </span>
                                    );
                                  })}
                                {subItem.icon !== false && (
                                  <span
                                    className="item-list-item-action"
                                    aria-hidden="true"
                                  >
                                    {subItem.icon || <FaChevronRight />}
                                  </span>
                                )}
                              </span>
                            </WonderLink>
                          </li> 
                        );
                      })
                    }
                  </ul>
                )}
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
  onCheck: PropTypes.func,
  subListIcon: PropTypes.string
};

export default ItemList;

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'fogg/ui';

import ClassName from 'models/classname';

import IconByName from 'components/IconByName';

const TableActions = ({ className, actions = [] }) => {
  const componentClass = new ClassName('table-actions');

  if (className) componentClass.add(className);

  const hasActions = Array.isArray(actions) && actions.length > 0;

  if (!hasActions) return null;

  return (
    <div className={componentClass.string}>
      <ul
        className={`${componentClass.childString(
          'set'
        )} ${componentClass.childString('set-right')}`}
      >
        {actions.map(({ to, label, icon, buttonType } = {}, index) => {
          const hasType =
            Array.isArray(buttonType) || typeof buttonType === 'string';
          const iconBefore = hasType && buttonType.includes('icon-before');
          const iconAfter = hasType && buttonType.includes('icon-after');

          if (typeof icon === 'string') {
            icon = <IconByName name={icon} />;
          }

          return (
            <li key={`TableActions-${index}`}>
              <Button to={to} type={buttonType}>
                {iconBefore && icon}
                {label}
                {iconAfter && icon}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TableActions.propTypes = {
  className: PropTypes.string,
  actions: PropTypes.array
};

export default TableActions;

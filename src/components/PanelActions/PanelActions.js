import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const PanelActions = ({ actions = [] }) => {
  if (!Array.isArray(actions)) return null;
  const activeActions = actions.filter(action => !!action.isVisible);
  if (activeActions.length === 0) return null;
  return (
    <ul>
      {activeActions.map((action, index) => {
        const { label, icon, onClick } = action;
        return (
          <li key={`PanelActions-${index}`}>
            <Button onClick={onClick}>
              <span className="visually-hidden">{label}</span>
              {icon}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

PanelActions.propTypes = {
  actions: PropTypes.array
};

export default PanelActions;

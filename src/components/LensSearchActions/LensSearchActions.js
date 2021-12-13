import React from 'react';
import PropTypes from 'prop-types';

import { useLens } from '../../hooks';

import Button from '../Button';
import IconByName from '../IconByName';

const LensSearchActions = ({ actions = [] }) => {
  const lens = useLens();

  return (
    <ul className="lens-sidebar-search-actions">
      {actions.map((action, i) => {
        const { label, icon, onClick } = action;

        /**
         * handleOnClick
         * @description Manages the click event on the actions by patching in the lens context
         */

        function handleOnClick (e) {
          if (typeof onClick === 'function') {
            onClick(e, lens);
          }
        }

        return (
          <li key={i}>
            <Button onClick={handleOnClick}>
              <IconByName name={icon} />
              <span className="visually-hidden">{label}</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

LensSearchActions.propTypes = {
  actions: PropTypes.array
};

export default LensSearchActions;

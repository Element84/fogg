import React from 'react';
import PropTypes from 'prop-types';

/**
 * RepeaterRow
 * @description Creates a form row element
 * @param children Children elements
 * @param col Number of columns in the row
 */

export const RepeaterRow = ({ children, col }) => {
  return (
    <div className="repeater-row" data-col={col}>
      {children}
    </div>
  );
};

RepeaterRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  col: PropTypes.number
};

export default RepeaterRow;

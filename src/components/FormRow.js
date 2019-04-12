import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormRow
 * @description Creates a form row element
 */

export const FormRow = ({ children, className = '', col }) => {
  return (
    <div className={`form-row ${className}`} data-col={col}>
      {children}
    </div>
  );
};

FormRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  col: PropTypes.number
};

export default FormRow;

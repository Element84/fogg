import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormRow
 * @description Creates a form row element
 */

export const FormRow = ({ children }) => {
  return <div className="form-row">{children}</div>;
};

FormRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default FormRow;
